import { Router } from "express";
import { auth } from "../../middlewares/auth";
import requestValidate from "../../middlewares/requestValidation";
import { groupSchemaValidation } from "./group.validation";
import { groupController } from "./group.controller";
import { groupAuth } from "../../middlewares/groupAuth";

const router = Router();

// Users joined groups
router.get("/my", auth(), groupController.getUserJoinedGroups);

// Group login for group access ":id is group id"
router.post("/login/:id", auth(), groupController.groupLogin);

// Create new group
router.post(
  "/",
  auth(),
  requestValidate(groupSchemaValidation.createGroup),
  groupController.createNewGroup,
);

// Get group details
router.get("/", auth(), groupAuth(), groupController.getGroupDetails);

// Update group
router.put(
  "/",
  auth(),
  requestValidate(groupSchemaValidation.updateGroup),
  groupController.updateGroup,
);

// See group members
router.get("/members", auth(), groupController.seeGroupMembers);

// Update group member role and remove members
router.put(
  "/members",
  auth(),
  requestValidate(groupSchemaValidation.updateGroupMembers),
  groupController.updateGroupMembers,
);

export const groupRoutes = router;
