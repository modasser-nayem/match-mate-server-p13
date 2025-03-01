import { JwtPayload } from "jsonwebtoken";
import {
  TCreateGroup,
  TUpdateGroup,
  TUpdateGroupMembers,
} from "./group.interface";
import { JwtGroupPayload } from "../../interface";

const getUserJoinedGroups = async (payload: { user: JwtPayload }) => {
  return {
    message: "getUserJoinedGroups",
    payload,
  };
};

const groupLogin = async (payload: { user: JwtPayload; groupId: string }) => {
  return {
    message: "groupLogin",
    payload,
  };
};

const createNewGroup = async (payload: {
  user: JwtPayload;
  data: TCreateGroup;
}) => {
  return {
    message: "createNewGroup",
    payload,
  };
};

const getGroupDetails = async (payload: { group: JwtGroupPayload }) => {
  return {
    message: "getGroupDetails",
    payload,
  };
};

const updateGroup = async (payload: {
  group: JwtGroupPayload;
  data: TUpdateGroup;
}) => {
  return {
    message: "updateGroup",
    payload,
  };
};

const seeGroupMembers = async (payload: { group: JwtGroupPayload }) => {
  return {
    message: "seeGroupMembers",
    payload,
  };
};

const updateGroupMembers = async (payload: {
  group: JwtGroupPayload;
  data: TUpdateGroupMembers;
}) => {
  return {
    message: "updateGroupMembers",
    payload,
  };
};

export const groupService = {
  getUserJoinedGroups,
  groupLogin,
  createNewGroup,
  getGroupDetails,
  updateGroup,
  seeGroupMembers,
  updateGroupMembers,
};
