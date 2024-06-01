export const user = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/user",
  "title": "User",
  "description": "A user/staff in the shelter apps",
  "type": "object",
  "properties": {
    "username": {
      "description": "username of  account",
      "type": "string"
    },
    "email": {
      "description": "email of user",
      "type": "string"
    },
    "password": {
      "description": "password of user",
      "type": "password"
    },
    "avatarurl": {
      "description": "avatar of user",
      "type": "uri"
    },
    "role": {
      "description": "role of user",
      "type": "string"
    },

  },
  "required": ["username", "password"]
}
