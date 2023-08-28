export interface Questions {
  id: string;
  question: string;
  type: "FIB" | "SCQs" | "MCQs" | "Dropdown";
  required: "yes" | "no";
  choices?: string[]; // Optional because not all questions have choices
  maxSelection?: number; // Optional, only for type MCQs
}

// Defining the shape of the Quiz
export interface Quiz {
  questions: Questions[];
}

// Additional types for the GraphQL response and errors
export interface QuizData {
  jsQuizz: Quiz;
}
