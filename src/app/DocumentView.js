import React, { Component } from 'react';
import './DocumentView.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import SvgIcon from 'material-ui/SvgIcon';
import rangy from 'rangy/lib/rangy-core.js';
import Digital from 'react-activity/lib/Digital';
import ReactMarkdown from 'react-markdown';
import { GithubPicker } from 'react-color';

export default class DocumentView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      highlightEnabled: false,
      unhighlightEnabled: false,
    }
  }

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
    window.getSelection().removeAllRanges();
  }

  unhighlightSelection = () => {
    this.highlighter.unhighlightSelection();
    window.getSelection().removeAllRanges();
  }

  onHighlightButtonPress = () => {
    // eslint-disable-next-line
    if (!this.state.unhighlightEnabled && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).toString() != "") {
      // A range is selected, highlight it
      this.highlightSelection();
      return;
    } else {
      // No range is selected (Un)bind events and highlight on mouseup/touchend (setting up auto highlighting)
      if (this.state.highlightEnabled) {
        this.disableHighlight();
      } else {
        this.enableHighlight();
        this.disableUnhighlight();
      }
    }
  }

  enableHighlight = () => {
    this.setState({ highlightEnabled: true });
    this.presenter.addEventListener('mouseup', this.highlightSelection);
    this.presenter.addEventListener('touchend', this.highlightSelection);
  }

  disableHighlight = () => {
    this.setState({ highlightEnabled: false });
    this.presenter.removeEventListener('mouseup', this.highlightSelection);
    this.presenter.removeEventListener('touchend', this.highlightSelection);
  }

  onUnhighlightButtonPress = () => {
    // eslint-disable-next-line
    if (!this.state.highlightEnabled && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).toString() != "") {
      // A range is selected, highlight it
      this.unhighlightSelection();
      return;
    } else {
      // No range is selected (Un)bind events and highlight on mouseup/touchend (setting up auto highlighting)
      if (this.state.unhighlightEnabled) {
        this.disableUnhighlight();
      } else {
        this.enableUnhighlight();
        this.disableHighlight();
      }
    }
  }

  enableUnhighlight = () => {
    this.setState({ unhighlightEnabled: true });
    this.presenter.addEventListener('mouseup', this.unhighlightSelection);
    this.presenter.addEventListener('touchend', this.unhighlightSelection);
  }

  disableUnhighlight = () => {
    this.setState({ unhighlightEnabled: false });
    this.presenter.removeEventListener('mouseup', this.unhighlightSelection);
    this.presenter.removeEventListener('touchend', this.unhighlightSelection);
  }

  onShowColorColorPicker = () => {
    this.setState({
      showColorPicker: !this.state.showColorPicker,
    });
  }



  render() {
    console.log('h, unh', this.state.highlightEnabled, this.state.unhighlightEnabled)
    return (
      /* Used to center stuff. This will be Navigated */
      <div className="document-view-container">
        {this.props.loading ?
          <div>
            <div id="presenter" ref={(div) => this.presenter = div}>
              <ReactMarkdown source={this.props.file.file} />
            </div>
            <FloatingActionButton className="absolute-eraser"
              backgroundColor={'rgba(220,220,220,.7)'}
              style={this.state.unhighlightEnabled ?
                { alignItems: 'center', justifyContect: 'center', border: 1, borderStyle: 'dashed', borderColor: 'grey' }
                :
                { alignItems: 'center', justifyContect: 'center' }
              }
              onTouchTap={this.onUnhighlightButtonPress}
              mini={true} >
              <SvgIcon>
                <path fill="grey" d="M15.14,3C14.63,3 14.12,3.2 13.73,3.59L2.59,14.73C1.81,15.5 1.81,16.77 2.59,17.56L5.03,20H12.69L21.41,11.27C22.2,10.5 22.2,9.23 21.41,8.44L16.56,3.59C16.17,3.2 15.65,3 15.14,3M17,18L15,20H22V18" />
              </SvgIcon>
            </FloatingActionButton>
            <FloatingActionButton className={'absolute-fab '}
              backgroundColor={'rgba(256,0,0,.6)'}
              style={this.state.highlightEnabled ?
                { alignItems: 'center', justifyContect: 'center', border: 1, borderStyle: 'dashed', borderColor: 'rgba(256,0,0,0.6)' }
                :
                { alignItems: 'center', justifyContect: 'center' }
              }
              onTouchTap={this.onHighlightButtonPress}>
              <FontIcon className="material-icons" style={{ color: 'white' }}>border_color</FontIcon>
            </FloatingActionButton>
            <FloatingActionButton className={'absolute-add'}
              backgroundColor={'rgba(255,255,255,.6)'}
              style={{ alignItems: 'center', justifyContect: 'center' }}
              onTouchTap={this.onShowColorColorPicker}
              mini={true}>
              <FontIcon className="material-icons" style={{ color: 'grey' }}>add</FontIcon>
            </FloatingActionButton>
            {this.state.showColorPicker &&
              <div>
                <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }} 
                  onClick={this.onShowColorColorPicker}
                  />
                <div style={{ position: 'fixed', bottom: 70, right: 78, transform: 'rotate(180deg)' }}>
                  <GithubPicker />
                </div>
              </div>
            }
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