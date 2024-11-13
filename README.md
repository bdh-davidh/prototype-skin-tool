# prototype-skin-tool

A prototype to demonstrate the potential of an AI tool to support skin disease diagnosis using the tool from https://autoderm.ai/.

Instructions:

1. Clone the repo to your local machine
2. Open in VS Code and update the API key variable in main.js
3. Install the Live Preview or Server VS code extension
4. Open the index.html file and use the extension to start a local server

You should now be able to test the prototype.

An API key can be obtained bt signing up at: https://autoderm.ai/signup.html There is a limit on the number of times it can be called for testing each day. The call returns a 400 error if the limit is exceeded.

## Returned Data Shape

`[
  {
    "confidence": 0.2388297363900399,
    "possibility": "Possible",
    "icd": "L70.9",
    "name": "Acne, Unspecified",
    "classificationId": "3e51ced2-d4aa-11e7-a562-0242ac120003",
    "readMoreUrl": "[https://www.firstderm.com/acne-vulgaris-zits/](https://www.firstderm.com/acne-vulgaris-zits/)"
  },
  {
    "confidence": 0.21992372811944544,
    "possibility": "Possible",
    "icd": "L70.0",
    "name": "Acne Vulgaris",
    "classificationId": "3e4f96d1-d4aa-11e7-a562-0242ac120003",
    "readMoreUrl": "[https://www.firstderm.com/acne-vulgaris-zits/](https://www.firstderm.com/acne-vulgaris-zits/)"
  },
  {
    "confidence": 0.17267211987413775,
    "possibility": "Possible",
    "icd": "L70.0",
    "name": "Acne Nodulocystica",
    "classificationId": "3e4f94a3-d4aa-11e7-a562-0242ac120003",
    "readMoreUrl": "[https://www.firstderm.com/acne-vulgaris-zits/](https://www.firstderm.com/acne-vulgaris-zits/)"
  },
  {
    "confidence": 0.16137008194907798,
    "possibility": "Possible",
    "icd": "0",
    "name": "Benign Other",
    "classificationId": "6703329d-9e2b-4a5d-bdce-168d8d8aaac0",
    "readMoreUrl": "[https://www.firstderm.com/skin-guide/](https://www.firstderm.com/skin-guide/)"
  }
]`
