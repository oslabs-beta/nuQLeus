import * as React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
//import styled from "styled-components";
//import cssToObject from "css-to-object";
//import SplitPane from "react-split-pane";

// background: #101010;
// color: #fff;
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/css/css");
require("codemirror/mode/jsx/jsx");
require("codemirror/lib/codemirror.css");
require("codemirror/theme/dracula.css");
require("codemirror/theme/panda-syntax.css");
require("codemirror/theme/material.css");
require("./theme.css");
require("./darcula.css");
require("./index.css");

const DEFAULT_JS_VALUE =
  "import * as React from 'react'\r\nimport { withRouter } from 'react-router'\r\n\r\nimport * as methods from './methods'\r\nimport { Input } from '#components/Input'\r\nimport { inject, observer } from 'mobx-react'\r\nimport './Splash.css'\r\n\r\nconst selector = (tree) => {\r\n  console.warn({ tree })\r\n  return {\r\n    moduleStore: tree.state.moduleStore\r\n  }\r\n}\r\n\r\n@withRouter\r\n@inject(selector)\r\n@observer\r\nexport class Splash extends React.Component {\r\n  setInputValue = methods.setInputValue(this)\r\n  handleEnterKey = methods.handleEnterKey(this)\r\n  submitRegistration = methods.submitRegistration(this)\r\n  attemptLogin = methods.attemptLogin(this)\r\n  handleLoginEnterKey = methods.handleLoginEnterKey(this)\r\n  state = {\r\n    emailInputValue: locast.lastUserEmail || '',\r\n    passwordInputValue: '',\r\n    usernameInputValue: ''\r\n  }\r\n\r\n  render() {\r\n    const { props, state } = this\r\n    console.log('<Splash>', { props, state })\r\n\r\n    return (\r\n      <div styleName=\"Splash\">\r\n        <h1 className=\"title\">place some copy here</h1>\r\n\r\n        <Input\r\n          big\r\n          value={state.usernameInutValue}\r\n          onChange={this.setInputValue('username')}\r\n          onKeyPress={this.handleEnterKey}\r\n        />\r\n\r\n        <Input\r\n          big\r\n          value={state.emailInputValue}\r\n          onChange={this.setInputValue('email')}\r\n          onKeyPress={this.handleEnterKey}\r\n        />\r\n\r\n        <Input\r\n          big\r\n          value={state.passwordInputValue}\r\n          onChange={this.setInputValue('password')}\r\n          onKeyPress={this.handleEnterKey}\r\n        />\r\n\r\n        {/* TODO: Style buttons and shit... */}\r\n        <button onClick={this.submitRegistration}>submit</button>\r\n\r\n        <h1>LOGIN FORM</h1>\r\n\r\n        <Input\r\n          big\r\n          value={state.usernameInputValue}\r\n          onChange={this.setInputValue('username')}\r\n          onKeyPress={this.handleLoginEnterKey}\r\n        />\r\n\r\n        <Input\r\n          big\r\n          value={state.passwordInputValue}\r\n          onChange={this.setInputValue('password')}\r\n          onKeyPress={this.handleLoginEnterKey}\r\n        />\r\n\r\n        {/* TODO: Style buttons and shit... */}\r\n        <button onClick={this.attemptLogin}>submit</button>\r\n\r\n        <small styleName=\"emailPrompt\">\r\n          Enter your email to create a new module.\r\n        </small>\r\n      </div>\r\n    )\r\n  }\r\n}\r\n";

const DEFAULT_JSX_OPTIONS = {
  theme: "custom-0",
  autoCloseBrackets: true,
  cursorScrollMargin: 48,
  mode: "jsx",
  lineNumbers: true,
  indentUnit: 2,
  tabSize: 2,
  styleActiveLine: true,
  viewportMargin: 99
};

// const DEFAULT_CSS_OPTIONS = {
//   theme: "custom-0",
//   autoCloseBrackets: true,
//   cursorScrollMargin: 48,
//   mode: "css",
//   lineNumbers: true,
//   indentUnit: 2,
//   tabSize: 2,
//   styleActiveLine: true,
//   viewportMargin: 99
// };

export class QueryEditor extends React.Component {

  constructor() {
    super()
    
    this.state = {
      jsValue: DEFAULT_JS_VALUE || this.props.jsValue,
      //cssValue: DEFAULT_CSS_VALUE || this.props.cssValue,
      jsxOptions: {
        ...DEFAULT_JSX_OPTIONS,
       // ...this.props.jsxOptions
      }
    };
  }
  // cssOptions = {
  //   ...DEFAULT_CSS_OPTIONS,
  //   ...this.props.cssOptions
  // };
  
  onChange (editor, data, value) {
    this.setState({ value });
  };

  render() {
    return (
      <React.Fragment>
          <PureEditor
            name="js"
            value={this.state.jsValue}
            options={this.state.jsxOptions}
            //onChange={this.onChange("js")}
          />
        <Style css={this.state.cssValue} />
      </React.Fragment>
    );
  }
}

class PureEditor extends React.PureComponent {
  render() {
    //console.log(`rendering -> ${this.props.name}`);
    return (
      <CodeMirror
        value={this.props.value}
        options={this.props.options}
        onBeforeChange={this.props.onChange}
      />
    );
  }
}

export const Style = props => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: props.css
      }}
    />
  );
};
