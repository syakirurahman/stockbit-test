import React from 'react'
import AppHeader from './../../components/AppHeader'

export default class Anagram extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originalArray: ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua'],
      output: [],
    }
  }

  isAnagram(word1, word2) {
    word1 = word1.toLowerCase().replace(/[^a-z\d]/g, '').split('');
    word2 = word2.toLowerCase().replace(/[^a-z\d]/g, '')
    if (word1.length === word2.length) {
      for (let char of word1 ){ 
        if (!word2.includes(char)) {
          return false
          break;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  groupAnagram() {
    const outputArrayTemp = [];
    const mutatedOriginalArray = Object.assign([], this.state.originalArray);
    const itemAlreadyGrouped = [];

    for(let i = 0;i < this.state.originalArray.length; i++) {
      mutatedOriginalArray.splice(0, 1);
      if(i+1 < this.state.originalArray.length && !itemAlreadyGrouped.includes(i)) {
        let groupedAnagram = [];
        for(let j = 0;j < mutatedOriginalArray.length; j++) {
          if(j === 0) {
            groupedAnagram.push(this.state.originalArray[i]);
            itemAlreadyGrouped.push(i);
          }
          if(this.isAnagram(this.state.originalArray[i], mutatedOriginalArray[j])) {
            groupedAnagram.push(mutatedOriginalArray[j])
            itemAlreadyGrouped.push(this.state.originalArray.indexOf(mutatedOriginalArray[j]));
          }
        }
        outputArrayTemp.push(groupedAnagram);
      }
    }
    this.setState({ output: outputArrayTemp });
  }

  componentDidMount() {
    this.groupAnagram();
  }
  render() {
    return (
      <div className="app-wrapper">
        <AppHeader title="AnagramTest"/>
        <div className="app-content">
          <h3>Original Array</h3>
          <div>{ JSON.stringify(this.state.originalArray) }</div>
          <h3>Output</h3>
          <div>
            { JSON.stringify(this.state.output) }
            <br/><br/>
            (See the codes in /src/pages/Anagram/index.js)
          </div>
        </div>
      </div>
    )
  }
}