import React, { Component } from 'react';
import './DocumentView.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import rangy from 'rangy/lib/rangy-core.js';


export default class DocumentView extends Component {

  componentDidMount() {
    // eslint-disable-next-line
    this.highlighter = rangy.createHighlighter();
    this.setState({
      highlightEnabled: false,
    })

    // Add class appliers
    this.highlighter.addClassApplier(rangy.createClassApplier("highlight", {
      ignoreWhiteSpace: true,
      tagNames: ["span"]
    }));
    this.highlighter.onHighlightAdded = (hl) => console.log(hl);
    this.highlighter.onHighlightRemoved = (hl) => console.log(hl);

    // Add stylesheets
    let sheet = document.createElement('style')
    sheet.innerHTML = ".highlight {background-color: rgba(256,0,0,0.6);}";
    document.body.appendChild(sheet);
  }

  onHighlightAdded = (highlight) => {
    // send AddHighlight to server

  }

  onHighlightRemoved = (highlight) => {
    // send RemoveHighlight to server
  }

  componentWillUnmount() {
    // TODO: remove added stylesheets
  }

  highlightSelection = () => {
    this.highlighter.highlightSelection("highlight", { containerElementId: 'presenter' });
    console.log(this.highlighter.serialize());
  }

  onHighlightButtonPress = () => {
    // eslint-disable-next-line
    if (window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).toString() != "") {
      // A range is selected, highlight it
      this.highlightSelection();
      return;
    } else {
      // No range is selected (Un)bind events and highlight on mouseup/touchend (setting up auto highlighting)
      if (this.state.highlightEnabled) {
        this.setState({ highlightEnabled: false });
        this.presenter.addEventListener('mouseup', this.highlightSelection);
        this.presenter.addEventListener('touchend', this.highlightSelection);
      } else {
        this.setState({ highlightEnabled: true });
        this.presenter.removeEventListener('mouseup', this.highlightSelection);
        this.presenter.removeEventListener('touchend', this.highlightSelection);
      }
    }
  }

  render() {
    return (
      /* Used to center stuff. This will be Navigated */
      <div className="document-view-container">
        {this.props.loading ?
          <div>
            <p className="section-header">{this.props.document.title}</p>
            <div id="presenter" ref={(div) => this.presenter = div}>
              <pre className="txtPresenter">{this.props.file.file}</pre>
            </div>
            <FloatingActionButton className="absolute-fab"
              backgroundColor={'rgba(256,0,0,.6)'}
              style={{ alignItems: 'center', justifyContect: 'center' }}
              onTouchTap={this.onHighlightButtonPress}>
              <FontIcon className="material-icons" color={'rgb(0,0,0)'} style={{ color: 'white' }}>border_color</FontIcon>
            </FloatingActionButton>
          </div>

        :

          <p> Loading ... </p>
        
        }
      </div >
    );
  }
}

DocumentView.propTypes = {
  document: React.PropTypes.object,
}