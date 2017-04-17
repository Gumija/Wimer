import React, { Component } from 'react';
import './DocumentView.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import rangy from 'rangy/lib/rangy-core.js';
import Digital from 'react-activity/lib/Digital';

export default class DocumentView extends Component {

  componentWillUnmount() {
    // TODO: remove added stylesheets
  }

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
    this.highlighter.onHighlightAdded = this.props.onHighlightAdded;
    this.highlighter.onHighlightRemoved = this.props.onHighlightRemoved;

    // Add stylesheets
    let sheet = document.createElement('style')
    sheet.innerHTML = ".highlight {background-color: rgba(256,0,0,0.6);}";
    document.body.appendChild(sheet);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.highlightsString.str !== this.props.highlightsString.str && this.presenter) {
      this.highlighter.deserialize(this.props.highlightsString.str)
    }
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
          <div className="loading_indicator">
            <Digital size={40} />
          </div>
        }
      </div >
    );
  }
}

DocumentView.propTypes = {
  document: React.PropTypes.object,
}