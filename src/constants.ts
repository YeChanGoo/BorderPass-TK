export const jsQuizz = {
  questions: [
    {
      id: "q1",
      question: "Please enter your name",
      type: "FIB",
      required: "yes",
    },
    {
      id: "q2",
      question: "What is ReactJS?",
      choices: [
        "Server-side framework",
        "User Interface framework",
        "both a and b",
        "None of the above",
      ],
      type: "SCQs",
      required: "yes",
    },
    {
      id: "q3",
      question:
        "Identify the one which is used to pass data to components from outside",
      choices: ["Render with arguments", "setState", "PropTypes", "props"],
      type: "SCQs",
      required: "yes",
    },
    {
      id: "q4",
      question: "In which language supports JavaScript? Choose 2",
      choices: ["Python", "TypeScript", "C#", "JavaScript"],
      type: "MCQs",
      maxSelection: 2,
      required: "yes",
    },
    {
      id: "q5",
      question: "What is a sport? Choose 3",
      choices: ["Baseball", "Tennis", "Reading", "Soccer"],
      type: "MCQs",
      maxSelection: 3,
      required: "yes",
    },
    {
      id: "q6",
      question: "Select one",
      choices: ["Pizza", "Burger", "Ice Cream", "None of the above"],
      type: "Dropdown",
      required: "yes",
    },
    {
      id: "q7",
      question: "Enter Address",
      type: "FIB",
      required: "no",
    },
  ],
};

export const resultInitialState = {};
