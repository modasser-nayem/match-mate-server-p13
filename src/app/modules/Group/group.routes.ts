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

// Update group - ADMIN
router.put(
  "/",
  auth(),
  groupAuth("admin"),
  requestValidate(groupSchemaValidation.updateGroup),
  groupController.updateGroup,
);

// See group members
router.get("/members", auth(), groupAuth(), groupController.seeGroupMembers);

// Update group member role
router.put(
  "/members/role",
  auth(),
  groupAuth("admin"),
  requestValidate(groupSchemaValidation.updateGroupMemberRole),
  groupController.updateGroupMemberRole,
);

// Remove member from group
router.delete(
  "/members/remove",
  auth(),
  groupAuth("admin"),
  requestValidate(groupSchemaValidation.removeGroupMember),
  groupController.removeGroupMember,
);

// Send group invitation
router.post(
  "/invite",
  auth(),
  groupAuth(),
  requestValidate(groupSchemaValidation.sendGroupInvite),
  groupController.sendGroupInvite,
);

// Accept group invitation
router.post(
  "/invite/accept",
  auth(),
  requestValidate(groupSchemaValidation.acceptGroupInvitation),
  groupController.acceptGroupInvitation,
);

// see my group invitations
router.get("/invite", auth(), groupController.seeMyGroupsInvitations);

// Cancel Group invitation
router.delete("/invite/:id", auth(), groupController.cancelGroupInvitation);

export const groupRoutes = router;
