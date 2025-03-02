import AppError from "../errors/AppError";
import { catchAsync } from "../utils/catchAsyncHandler";
import { verifyGroupAccessToken } from "../utils/jwtToken";
import { GroupMember } from "../modules/Group/group.model";
import { TGroupMemberRole } from "../modules/Group/group.interface";

const throwError = () => {
  throw new AppError(
    403,
    "Access denied. You do not have permission to access this resource.",
  );
};

export const groupAuth = (...roles: TGroupMemberRole[]) =>
  catchAsync(async (req, res, next) => {
    const token = req.headers["x-group-access"];

    // checking if the token is missing
    if (!token) {
      throwError();
      console.log("error-hear // 21");
    }

    // checking if the given token is valid
    const decoded = verifyGroupAccessToken(token as string);

    const { groupId, userId } = decoded;

    // checking group-user and authorization user are same
    if (userId !== req.user.id) {
      throwError();
      console.log("error-hear // 32");
    }

    // check user exist on this group
    const groupMember = await GroupMember.findOne({
      group_id: groupId,
      user_id: userId,
    });

    if (!groupMember) {
      throwError();
      console.log("error-hear // 40");
    }

    if (roles.length && groupMember && !roles.includes(groupMember.role)) {
      throwError();
      console.log("error-hear // 45");
    }

    req.group = decoded;
    next();
  });
