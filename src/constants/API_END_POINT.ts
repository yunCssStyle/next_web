const API_END_POINT = {
  events: {
    doEvent: "/events/do-event",
    reset: "events/reset",
  },
  infos: {
    event: "/infos/event",
  },
  members: {
    myInfo: "/members/my-info",
    registerMember: "/members/register-member",
    validDuplicateNickname: "/members/valid-duplicate-nickname",
    validFriendNickname: "/members/valid-friends-nickname",
  },
  oauth: {},
} as const;

export default API_END_POINT;
