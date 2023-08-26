import Quiz from "./components/Quiz/Quiz";
// import { useEffect, useState } from "react";
import { jsQuizz } from "./constants";
import { Container } from "@mui/material";

function App() {
  // const [questions, setQuestions] = useState([]);
  // useEffect(() => {
  //   getQuestions();
  // }, []);

  // const getQuestions = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://644982a3e7eb3378ca4ba471.mockapi.io/questions"
  //     );
  //     const questionResponse = await response.json();
  //     console.log(questionResponse);
  //     setQuestions(questionResponse);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // return <>{questions.length && <Quiz questions={questions} />}</>;
  return (
    <Container maxWidth='md'>
      <Quiz questions={jsQuizz.questions} />
    </Container>
  );
}

export default App;
