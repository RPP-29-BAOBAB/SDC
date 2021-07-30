import React from 'react';
import Question from './Question.jsx';
import AddQuestion from './AddQuestion.jsx';
import axios from 'axios';


class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsDisplay: 0,
      moreQuesionButton: false,
      addQuestionButton: true
    };
  }

  componentDidMount() {
    this.checkRemainQuestion();
  }

  checkRemainQuestion() {
    const questions = this.props.questions;
    const questionsLength = questions.length;
    if (questionsLength - 2 > this.state.questionsDisplay) {
      this.setState({
        questionsDisplay: this.state.questionsDisplay + 2,
        moreQuesionButton: true
      });
    }
    if (questionsLength - 2 <= this.state.questionsDisplay) {
      this.setState({
        questionsDisplay: questionsLength,
        moreQuesionButton: false
      });
    }
  }

  moreQuestionsButton() {
    if (this.state.moreQuesionButton) {
      return (
        < button id='moreQuestions' onClick={this.checkRemainQuestion.bind(this)} >
          MORE ANSWERED QUESTIONS
        </button>
      );
    } else {
      return null;
    }
  }

  addQuestionForm() {
    if (this.state.addQuestionButton) {
      return (
        <AddQuestion />
      );
    }
  }

  addQuestionClick() {
    if (this.state.addQuestionButton) {
      this.setState({
        addQuestionButton: false
      });
    } else {
      this.setState({
        addQuestionButton: true
      });
    }
  }

  renderQuestions() {
    let questionsList = [];
    const questions = this.props.questions;
    for (let i = 0; i < this.state.questionsDisplay; i++) {
      questionsList.push(questions[i]);
    }
    return (
      <div>
        <Question questions={questionsList} />
        {this.moreQuestionsButton()}
        <button id='addQuestion' onClick={this.addQuestionClick.bind(this)}>ADD A QUESTION +</button>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderQuestions()}
        {this.addQuestionForm()}
      </div>

    );
  }
}

export default QuestionsList;