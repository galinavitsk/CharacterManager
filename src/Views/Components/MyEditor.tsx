import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

export interface MyEditorProps {
  editorState;
  onChange;
  
}
 
export interface MyEditorState {
  
}
 
class MyEditor extends React.Component<MyEditorProps, MyEditorState> {
  render() { 
    return ( <div> <Editor 
      editorState={this.props.editorState}
      wrapperClassName="rich-editor demo-wrapper"
      editorClassName="demo-editor"
      onEditorStateChange={this.props.onChange}
      placeholder="" />
  </div>);
  }
}
 
export default MyEditor;