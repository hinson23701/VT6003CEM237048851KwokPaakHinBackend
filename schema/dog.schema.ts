export const dog = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/dog",
  "title": "dog",
  "description": "Dogs in the Canine Shelter",
  "type": "object",
  "properties": {
    "id": {
      "description": "Unique identifier for the dog",
      "type": "integer",
      "minimum": 1
    },
    "name": {
      "description": "Name of the dog",
      "type": "string"
    },
    "breed": {
      "description": "Breed of the dog",
      "type": "string"
    },
    "age": {
      "description": "Age of the dog",
      "type": "integer",
      "minimum": 0
    },
    "sex": {
      "description": "Sex of the dog",
      "type": "string"
    },
    "size": {
      "description": "Size of the dog",
      "type": "string"
    },
  
    "description": {
      "description": "Description of the dog",
      "type": "string"
    },
    "imageURL": {
      "description": "URL for the dog's image",
      "type": "uri"
    },
    "available": {
      "description": "Indicates if the dog is available for adoption",
      "type": "boolean"
    }
  },
  "required": ["id", "name", "breed", "age", "sex", "size", "available"]
};