import React from 'react';
// To include the default styles
import 'react-rangeslider/lib/index.css'


//Toast Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//My CSS stuff
import './css/General_Project.css'
import './css/ProjectSkywriting.css'
import 'rc-slider/assets/index.css';

//my Image Stuff
import testImage from './images/banner.png'

//My React Stuff
import ProjectSkywriting from './ProjectSkywriting';
import Legend from './Legend';



//3rd Part Social Media Sharing
import {

  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TumblrShareButton,

  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TumblrIcon
} from 'react-share';

/*REACT Bootstrap Stuff*/
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Form from  'react-bootstrap/lib/Form';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Radio from 'react-bootstrap/lib/Radio';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Modal from 'react-bootstrap/lib/Modal';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
//import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Navbar from 'react-bootstrap/lib/Navbar';

/*Range Slider Stuff*/
import Slider from 'react-rangeslider'
//import * as Slider_RC from 'rc-slider';;
//import Slider from 'rc-slider/lib/Slider';
import {default as Slider_RC, createSliderWithTooltip, Handle} from 'rc-slider';
import Range from 'rc-slider/lib/Range';
import Tooltip from 'rc-tooltip';

//Query string bullshit
const queryString = require('query-string');

//3rd Party File-Saver
var FileSaver = require('file-saver');

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;

  const scaleTooltips = {
    0: 'No meaningful function in place',
    1: 'Min. ability to execute, no dedicated staff',
    2: 'Some ability to execute, some staff, low xp',
    3: 'Moderate ability to execute, some staff, some xp',
    4: 'Excels at execution, staffing, xp'
  }
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={scaleTooltips[value]}
      visible={dragging}
      placement="top"
      key={index}>
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};




class ProjectSkywritingDemo extends React.Component {
  constructor(props){
     super(props);
     this.state = {
       svg_width: 600,
       svg_height: 600,
       numCriteria: 17,
       numLevels: 5,
       defaultNumLevels: 5,
       saveName: '',
       useCustomCriteria: false,
       useDefaults: false,
       lockCriteriaNames: false,
       lockAddCompany: false,
       profileToLoadDeleteDownload: '',
       showModalForImport: false,
       showModalForLoad: false,
       showModalForDownload: false,
       showModalForDefaultRatingScale: false,
       showModalForInfoOnTypesOfUsers: false,
       graphIsHidden: true,
       criteria: [
         'Customers',
         'Sales',
         'Software Engineering',
         'Hardware Engineering',
         'Project Management',
         'UX Design',
         'Graphic Design',
         'Strategic Partners',
         'Channel Partners',
         'Research',
         'Operations',
         'Advertising & Promotions',
         'Product Evangelism',
         'Finance',
         'Supply Chain Management',
         'Press & Analysts',
         'Investor Relations'
       ],
       data: [],
       companies: [],
       individualNames:[],
       colors: [],
       profileToImport: {},
       rawQueryString: [],
       smTitle: 'Check out my sk1llz on productcampsd.org!',
       smURL: 'http://scitechpond.com',
       scale: {
         0: '0',
         1: '1',
         2: '2',
         3: '3',
         4: '4'
       }
     }
     this.addCompany = this.addCompany.bind(this);
     this.addIndividual = this.addIndividual.bind(this);
     this.downloadData = this.downloadData.bind(this);
     this.deleteData = this.deleteData.bind(this);
     this.generatePreCriteriaArray = this.generatePreCriteriaArray.bind(this);
     this.generateUrlQueryString = this.generateUrlQueryString.bind(this);
     this.getCompanyRadioButtonStatus = this.getCompanyRadioButtonStatus.bind(this);
     this.getIndividualRadioButtonStatus = this.getIndividualRadioButtonStatus.bind(this);
     this.handleCompanyRadioButtonChange = this.handleCompanyRadioButtonChange.bind(this);
     this.handleCloseForDownloadModal = this.handleCloseForDownloadModal.bind(this);
     this.handleCloseForImportModal = this.handleCloseForImportModal.bind(this);
     this.handleCloseForLoadModal = this.handleCloseForLoadModal.bind(this);
     this.handleCloseForDefaultRatingScaleModal = this.handleCloseForDefaultRatingScaleModal.bind(this);
     this.handleCloseForTypesOfUsersModal = this.handleCloseForTypesOfUsersModal.bind(this);
     this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
     this.handleGeneralValueChange = this.handleGeneralValueChange.bind(this);
     this.handleSlider_levelChange = this.handleSlider_levelChange.bind(this);
     this.handleImportData = this.handleImportData.bind(this);
     this.handleIndividualRadioButtonChange = this.handleIndividualRadioButtonChange.bind(this);
     this.handleShowModalForDefaultRatingScale = this.handleShowModalForDefaultRatingScale.bind(this);
     this.handleShowImportModal = this.handleShowImportModal.bind(this);
     this.handleShowLoadModal = this.handleShowLoadModal.bind(this);
     this.handleShowDownloadModal = this.handleShowDownloadModal.bind(this);
     this.handleShowTypesOfUsersModal = this.handleShowTypesOfUsersModal.bind(this);
     this.importData = this.importData.bind(this);
     this.loadCustomCriteriaInputField = this.loadCustomCriteriaInputField.bind(this);
     this.loadData = this.loadData.bind(this);
     this.loadDefaultCriteria = this.loadDefaultCriteria.bind(this);
     this.saveData = this.saveData.bind(this);
     this.setProfileToLoadDeleteDownload = this.setProfileToLoadDeleteDownload.bind(this);
     this.testUrlQueryString = this.testUrlQueryString.bind(this);
  }
  /*
   * ===================
   * METHODS: Validation
   * ===================
   */
  get_numCriteria_validation(){
    if(!isNaN(this.state.numCriteria) && this.state.numCriteria>0) return 'success';

    return 'error';
  }
  get_numLevels_validation(){
    if(!isNaN(this.state.numLevels) && this.state.numLevels>0) return 'success';

    return 'error';
  }
  get_criteria_validation(){
    if( (this.state.criteria.length != this.state.numCriteria) || this.state.criteria.length == 0) return 'error';
    return 'success';
  }
  /*
   * ===================
   * METHODS: Randomization
   * ===================
   */
  get_randomColor(){
    //https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
    return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
  }
  /*
   * ===================
   * METHODS: Event Handlers
   * ===================
   */
   handleCompanyRadioButtonChange(companyIndex, event){
     const target = event.target;
     const value = target.value;
     let name = target.name.split('_')[0]; //radio buttons have unique names so that you can select them
     let newDataForCompany = this.state.companies[companyIndex];

     for(let i=0; i<this.state.criteria.length; i++){
       for (let property in newDataForCompany[i]) {
           if (newDataForCompany[i].hasOwnProperty(property)) {
               if( (property === 'axis') && (newDataForCompany[i].axis === name) ) {
                 newDataForCompany[i].value = value;
               }
           }
       }
     }

     let newState = this.state;
     newState.companies[companyIndex] = newDataForCompany;
     this.setState(newState);
   }

  handleGeneralValueChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSlider_levelChange = (value) => {
    let newState = this.state;
    newState.numLevels = value;
    this.setState(newState);
  }



  handleIndividualNameChange(individualIndex, event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let newState = this.state;
    newState.individualNames[individualIndex] = value;
    this.setState(newState);
  }

  handleIndividualRadioButtonChange(individualIndex, event){
    const target = event.target;
    const value = target.value;
    let name = target.name.split('_')[0]; //radio buttons have unique names so that you can select them
    let newDataForIndividual = this.state.data[individualIndex];

    for(let i=0; i<this.state.criteria.length; i++){
      for (let property in newDataForIndividual[i]) {
          if (newDataForIndividual[i].hasOwnProperty(property)) {
              if( (property === 'axis') && (newDataForIndividual[i].axis === name) ) {
                newDataForIndividual[i].value = value;
              }
          }
      }
    }

    let newState = this.state;
    newState.data[individualIndex] = newDataForIndividual;
    this.setState(newState);
  }


  /*
   * ===================
   * METHODS: DOM Generation (Individuals/Company input)
   * ===================
   */
   generateCompanyRadioButtons(criteriaName, companyIndex){
     if(this.state.criteria.length != this.state.numCriteria || this.state.criteria.length == 0) return; //user hasn't supplied names of all criteria yet

     let radioButtons = [];
     for(let i=0; i<this.state.numLevels; i++){
       radioButtons.push(
           <Radio name={criteriaName + '_' + ((companyIndex + 1) * 1000)} key={i} value={i} onClick={ (e) => this.handleCompanyRadioButtonChange(companyIndex, e) } className="word_fanciness" checked={this.getCompanyRadioButtonStatus(companyIndex, criteriaName, i)} inline >
             {i}
           </Radio>
       );
     }
     return radioButtons;
   }

   generateIndividualRadioButtons(criteriaName, individualIndex){
     if(this.state.criteria.length != this.state.numCriteria || this.state.criteria.length == 0) return; //user hasn't supplied names of all criteria yet

     let radioButtons = [];
     for(let i=0; i<this.state.numLevels; i++){
       radioButtons.push(
           <Radio name={criteriaName + '_' + individualIndex} key={i} value={i} onClick={ (e) => this.handleIndividualRadioButtonChange(individualIndex, e) } className="word_fanciness" checked={this.getIndividualRadioButtonStatus(individualIndex, criteriaName, i)} inline>
             {i}
           </Radio>
       );
     }
     return radioButtons;
   }
   generateCompanyCriteriaSet(companyIndex){
     let setOfCriteria = [];
     for(let i=0; i<this.state.criteria.length; i++){
       setOfCriteria.push(
         <div key={i}>
           <FormGroup>
             <ControlLabel className="word_fanciness">{this.state.criteria[i] + '::'}</ControlLabel>{' '}
             <FormGroup>
               { this.generateCompanyRadioButtons(this.state.criteria[i], companyIndex) }
             </FormGroup>
           </FormGroup>
         </div>
       );
     }
     return setOfCriteria;
   }

   generateIndividualCriteriaSet(individualIndex){
     if(this.state.criteria.length != this.state.numCriteria || this.state.criteria.length == 0) return; //user hasn't supplied names of all criteria yet

     let setOfCriteria = [];
     for(let i=0; i<this.state.criteria.length; i++){
       setOfCriteria.push(
         <div key={i}>
           <FormGroup>
             <ControlLabel className="word_fanciness">{this.state.criteria[i] + '::'}</ControlLabel>{' '}
             <FormGroup>
               { this.generateIndividualRadioButtons(this.state.criteria[i], individualIndex) }
             </FormGroup>
           </FormGroup>
         </div>
       );
     }
     return setOfCriteria;
   }

   generateApplicantHeader(indexOfIndividual){
     if(indexOfIndividual == 0) return (<h4 className="word_fanciness">Applicants:</h4>);
   }
   generateCompanies(){
     return this.state.companies.map((el, i) =>
         <div key={i} className="dynamic_columns">
          <h4 className="word_fanciness">Company:</h4>
          {this.generateCompanyCriteriaSet(i)}
          <hr/>
         </div>
     )
   }

   generateIndividuals(){
     return this.state.data.map((el, i) =>
         <div key={i} className="dynamic_columns">
          {this.generateApplicantHeader(i)}
          {this.generateIndividualNameField(i)}
          {this.generateIndividualCriteriaSet(i)}
          <hr/>
         </div>
     )
   }

   generateIndividualNameField(individualIndex){
     if(this.state.criteria.length != this.state.numCriteria || this.state.criteria.length == 0) return; //user hasn't supplied names of all criteria yet

     return(
       <FormGroup>
         <ControlLabel className="word_fanciness">Name:</ControlLabel>{' '}
         <FormGroup>
           <FormControl
             type="text"
             name="individualNames"
             placeholder="Enter Name"
             value={this.state.individualNames[individualIndex]}
             onChange={(e) => this.handleIndividualNameChange(individualIndex, e)}  />
         </FormGroup>
       </FormGroup>
     );

   }

  /*
   * ===================
   * METHODS: DOM Generation (Criteria Names input)
   * ===================
   */
  generateCriteriaInputFields(){
    let criteria = [];
    for(let i=0; i<this.state.numCriteria; i++){
      criteria.push(
        <Row key={i}>
          <Col md={6}>
            <FormGroup
              controlId={"fgCriteriaNames" + i}>
              <Row>
                <Col xs={2}>
                  <ControlLabel>{i + ' : '}</ControlLabel>
                </Col>
                <Col xs={8}>
                  <FormControl
                    type="text"
                    name="criteria"
                    value={this.state.criteria[i]}
                    placeholder="Name of Criteria"
                    onChange={(e) => this.handleCriteriaChange(i, e)}
                    />
                </Col>
                <Col xs={2}>
                  <Glyphicon glyph="remove" className="customRemoveGlypicon"/>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col md={5} xsHidden smHidden>
            <Slider_RC
              min={0}
              max={4}
              dots={true}
              marks={this.state.scale}
              handle={handle}
              className='customCriteriaSlider'
            />
          </Col>
          <Col md={6} mdHidden lgHidden>
            <Slider_RC
              min={0}
              max={4}
              dots={true}
              marks={this.state.scale}
              style={{margin:'10px 5px 30px'}}
            />
          </Col>
        </Row>
      );
    }
    return criteria || null;
  }

  /*
   * ===================
   * METHODS: DOM Generation (Needed prior to criteria input)
   * ===================
   */
   generateCustomCriteriaNumField(){
     if(this.state.useCustomCriteria){
       return (
       <FormGroup
         controlId="fgNumCriteria"
         validationState={this.get_numCriteria_validation()}>
         <ControlLabel># of Criteria</ControlLabel>
         <FormControl
           type="text"
           name="numCriteria"
           value={this.state.numCriteria}
           placeholder="# Criteria"
           onChange={this.handleGeneralValueChange} />
         <FormControl.Feedback />
         <HelpBlock>How many things do you want to measure against? Must be a positive integer.</HelpBlock>
       </FormGroup>
     );

     }
     return;
   }

   generatePreCriteriaArray(){
     if(this.state.criteria.length != this.state.numCriteria || this.state.criteria.length == 0) return; //user hasn't supplied names of all criteria yet
     let preCriteriaList = [];
     for(let i=0; i<this.state.criteria.length; i++){
       preCriteriaList.push({axis:this.state.criteria[i], value:0});
     }
     return preCriteriaList;
   }

  /*
   * ===================
   * METHODS: DOM Generation (Legend)
   * ===================
   */

  generateLegend(){
    return this.state.data.map((el, i) =>
      <g key={i}>
        <rect x="0" y={i * 30} width="20" height="20" fill={this.state.colors[i]} />
        <text x="50" y={i * 30} dy="1.25em" className="word_fanciness"> {this.state.individualNames[i]} </text>
      </g>
    )
  }

  /*
   * ===================
   * METHODS: DOM Generation (Modals)
   * ===================
   */
   //Save/Load
   getSelectOptionsForLoadDeleteDownloadProfiles(){
     let savedProfileNames = []

     Object.keys(localStorage).forEach(function(key){
        savedProfileNames.push(key);
     });

     let selectOptions = [];

     for(let i=0; i<savedProfileNames.length; i++){
       selectOptions.push(
         <option key={i} value={savedProfileNames[i]}> {savedProfileNames[i]} </option>
       );
     }
     return selectOptions;
   }

   wrapperForLoadDeleteDownloadSelect(){
     return(
       <FormControl componentClass="select" placeholder="select" onChange={this.setProfileToLoadDeleteDownload}>
         <option value="select">select</option>
         {this.getSelectOptionsForLoadDeleteDownloadProfiles()}
       </FormControl>
     );
   }


  /*
   * ===================
   * METHODS: Handlers (Buttons)
   * ===================
   */
  // Adding Elements
  addCompany(){
    let preCriteriaArray = this.generatePreCriteriaArray();
    let newState = this.state;
    newState.companies.push(preCriteriaArray);
    newState.lockAddCompany = true;
    this.setState(newState);
  }

  addIndividual(){
    let preCriteriaArray = this.generatePreCriteriaArray();
    let newState = this.state;
    newState.colors.push(this.get_randomColor());
    newState.data.push(preCriteriaArray);
    newState.lockCriteriaNames = true;
    newState.graphIsHidden = false;
    this.setState(newState);
  }

  // Saving/Loading/Deleting Data
  deleteData(event) {
    let newState = this.state;
    newState.showModalForLoad = false;

    localStorage.removeItem(this.state.profileToLoadDeleteDownload);
    toast.success("Success! Deleted Profile:" + this.state.profileToLoadDeleteDownload, {
      position: toast.POSITION.TOP_CENTER
    });
    newState.profileToLoadDeleteDownload = '';
    this.setState(newState);
  }
  saveData(event){
    let saveState = this.state;
    if(!saveState.saveName){
      toast.error("Nope! Need a profile name!", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }


    localStorage.setItem(saveState.saveName, JSON.stringify(saveState));
    toast.success("Success! Saved Under:" + saveState.saveName, {
      position: toast.POSITION.TOP_CENTER
    });
  }


  handleImportData(event){
    let reader = new FileReader();
    let importedData;
    let newState = this.state;
    reader.onload = function(e) {
      importedData = reader.result;
      newState.profileToImport = JSON.parse(importedData);
      this.setState(newState);
    }.bind(this);
    reader.readAsText(event.target.files[0]);


  }

  importData(event){
    let newState = this.state.profileToImport;
    newState.profileToImport = {};
    newState.showModalForImport = false;
    toast.success("Nice! Imported saved profile!", {
      position: toast.POSITION.TOP_CENTER
    });
    this.setState(newState);
  }


  loadData(event){

    let newState = JSON.parse(localStorage.getItem(this.state.profileToLoadDeleteDownload));
    newState.showModalForLoad = false;
    newState.profileToLoadDeleteDownload = '';
    toast.success("Nice! Loaded:" + this.state.profileToLoadDeleteDownload, {
      position: toast.POSITION.TOP_CENTER
    });
    this.setState(newState);
  }
  downloadData(event){
    let newState = this.state;
    newState.showModalForDownload = false;

    let dataBlobToDownload = JSON.parse(localStorage.getItem(this.state.profileToLoadDeleteDownload));

    let file = new File([JSON.stringify(dataBlobToDownload)], newState.profileToLoadDeleteDownload + ".json", {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(file);

    this.setState(newState);
  }

  // Default vs Custom
  loadCustomCriteriaInputField(event){
    let newState = this.state;
    newState.useCustomCriteria = true;
    this.setState(newState);
  }

  loadDefaultCriteria(event){
    let newState = this.state;
    newState.criteria = [
      'Customers',
      'Sales',
      'Software Engineering',
      'Hardware Engineering',
      'Project Management',
      'UX Design',
      'Graphic Design',
      'Strategic Partners',
      'Channel Partners',
      'Research',
      'Operations',
      'Advertising & Promotions',
      'Product Evangelism',
      'Finance',
      'Supply Chain Management',
      'Press & Analysts',
      'Investor Relations'
    ]
    newState.numCriteria = newState.criteria.length;
    newState.useDefaults = true;
    newState.numLevels = this.state.defaultNumLevels;
    this.setState(newState);
  }

  //Modals
  handleCloseForLoadModal(){
    let newState = this.state;
    newState.showModalForLoad = false;
    this.setState(newState);
  }
  handleCloseForDownloadModal(){
    let newState = this.state;
    newState.showModalForDownload = false;
    this.setState(newState);
  }
  handleCloseForImportModal(){
    let newState = this.state;
    newState.showModalForImport = false;
    this.setState(newState);
  }
  handleCloseForDefaultRatingScaleModal(){
    let newState = this.state;
    newState.showModalForDefaultRatingScale = false;
    this.setState(newState);
  }
  handleCloseForTypesOfUsersModal(){
    let newState = this.state;
    newState.showModalForInfoOnTypesOfUsers = false;
    this.setState(newState);
  }
  handleShowLoadModal(){
    let newState = this.state;
    newState.showModalForLoad = true;
    this.setState(newState);
  }
  handleShowDownloadModal(){
    let newState = this.state;
    newState.showModalForDownload = true;
    this.setState(newState);
  }
  handleShowImportModal(){
    let newState = this.state;
    newState.showModalForImport = true;
    this.setState(newState);
  }
  handleShowModalForDefaultRatingScale(){
    let newState = this.state;
    newState.showModalForDefaultRatingScale = true;
    this.setState(newState);
  }
  handleShowTypesOfUsersModal(){
    let newState = this.state;
    newState.showModalForInfoOnTypesOfUsers = true;
    this.setState(newState);
  }


  /*
   * ===================
   * METHODS: Handlers (Input Text Changes)
   * ===================
   */

  handleCriteriaChange(i, event){
    const target = event.target;
    const value = target.value;

    let newState = this.state;
    newState.criteria[i] = value;

    this.setState(newState);
  }

  handleSaveName(event){
    const target = event.target;
    const value = target.value;

    let newState = this.state;
    newState.saveName = value;

    this.setState(newState);
  }

  setProfileToLoadDeleteDownload(event){
    const target = event.target;
    const value = target.value;
    let newState = this.state;
    newState.profileToLoadDeleteDownload = value;
    //console.log(newState);
    this.setState(newState);
  }


  /*
   * ===================
   * METHODS: Prototypes
   * ===================
   */

  getCompanyRadioButtonStatus(companyIndex, criteriaName, radioButtonValue){
    for(let i=0; i<this.state.criteria.length; i++){
      for (let property in this.state.companies[companyIndex][i]) {
          if (this.state.companies[companyIndex][i].hasOwnProperty(property)) {
              if( (property === 'axis') && (this.state.companies[companyIndex][i].axis === criteriaName) ) {
                if(this.state.companies[companyIndex][i].value == radioButtonValue) {
                  return true;
                }
              }
          }
      }
    }
    return false;
  }

  getIndividualRadioButtonStatus(individualIndex, criteriaName, radioButtonValue){
      for(let i=0; i<this.state.criteria.length; i++){
      for (let property in this.state.data[individualIndex][i]) {
          if (this.state.data[individualIndex][i].hasOwnProperty(property)) {
              if( (property === 'axis') && (this.state.data[individualIndex][i].axis === criteriaName) ) {
                if(this.state.data[individualIndex][i].value == radioButtonValue) {
                  return true;
                }
              }
          }
      }
    }
    return false;
  }





  /*
   * Social Media Stuff
   */
   testUrlQueryString(event){
     let rootLink = "localhost:3000/project/RadarChartDemo?";
     let smLink = '';
     smLink = this.appendColorsToSocialMediaLink(rootLink).concat('&');
     smLink = this.appendIndividualsToSocialMediaLink(smLink).concat('&');
     smLink = this.appendCompaniesToSocialMediaLink(smLink).concat('&');
     smLink = this.appendCriteriaToSocialMediaLink(smLink).concat('&');
     smLink = this.appendIndividualNamesToSocialMediaLink(smLink).concat('&');
     smLink = this.appendNumCriteriaAndLevels(smLink);
     return smLink;
     /*
     console.log(smLink);

     const values = queryString.parse(this.props.urlQueryString, {arrayFormat: 'index'});
     console.log(values.data[0]);
     console.log(values.colors[0]);
     console.log(values.companies[0]);
     console.log(values.criteria[0]);
     console.log(values.individualNames[0]);
     console.log(values.numLevels)
     */
     //console.log(this.props.urlParams.projectId);
     //console.log(this.props.urlQueryString);
   }
   generateUrlQueryString(event){
     let rootLink = "http://scitechpond.com/project/ProjectSkywritingDemo?";
     let smLink = '';
     smLink = this.appendColorsToSocialMediaLink(rootLink).concat('&');
     smLink = this.appendIndividualsToSocialMediaLink(smLink).concat('&');
     smLink = this.appendCompaniesToSocialMediaLink(smLink).concat('&');
     smLink = this.appendCriteriaToSocialMediaLink(smLink).concat('&');
     smLink = this.appendIndividualNamesToSocialMediaLink(smLink).concat('&');
     smLink = this.appendNumCriteriaAndLevels(smLink).concat('&');
     smLink = this.appendMiscStuff(smLink);

     return smLink;
   }

   appendColorsToSocialMediaLink(parentUrl){
     let rootUrl = parentUrl;
     for(let i = 0; i < this.state.colors.length; i++){
       if(i+1 == this.state.colors.length)
         rootUrl = rootUrl.concat('colors[' + i + ']=%23' + this.state.colors[i].substring(1, this.state.colors[i].length) ); //need to escape #
       else
         rootUrl = rootUrl.concat('colors[' + i + ']=%23' + this.state.colors[i].substring(1, this.state.colors[i].length) + '&'); //need to escape #
     }
     return rootUrl;
   }
   appendIndividualsToSocialMediaLink(parentUrl){
     let rootUrl = parentUrl;
     for(let i = 0; i < this.state.data.length; i++){
       if(i+1 == this.state.data.length)
         rootUrl = rootUrl.concat('data[' + i + ']=' + JSON.stringify(this.state.data[i]));
       else
         rootUrl = rootUrl.concat('data[' + i + ']=' + JSON.stringify(this.state.data[i]) + '&');
     }
     return rootUrl;
   }
   appendCompaniesToSocialMediaLink(parentUrl){
     let rootUrl = parentUrl;
     for(let i = 0; i < this.state.companies.length; i++){
       if(i+1 == this.state.companies.length)
         rootUrl = rootUrl.concat('companies[' + i + ']=' + JSON.stringify(this.state.companies[i]));
       else
         rootUrl = rootUrl.concat('companies[' + i + ']=' + JSON.stringify(this.state.companies[i]) + '&');
     }
     return rootUrl;
   }
   appendCriteriaToSocialMediaLink(parentUrl){
     let rootUrl = parentUrl;
     for(let i = 0; i < this.state.criteria.length; i++){
       if(i+1 == this.state.criteria.length)
         rootUrl = rootUrl.concat('criteria[' + i + ']=' + this.state.criteria[i] ); //need to escape #
       else
         rootUrl = rootUrl.concat('criteria[' + i + ']=' + this.state.criteria[i] + '&'); //need to escape #
     }
     return rootUrl;
   }
   appendIndividualNamesToSocialMediaLink(parentUrl){
     let rootUrl = parentUrl;
     for(let i = 0; i < this.state.individualNames.length; i++){
       if(i+1 == this.state.individualNames.length)
         rootUrl = rootUrl.concat('individualNames[' + i + ']=' + this.state.individualNames[i] ); //need to escape #
       else
         rootUrl = rootUrl.concat('individualNames[' + i + ']=' + this.state.individualNames[i] + '&'); //need to escape #
     }
     return rootUrl;
   }
   appendNumCriteriaAndLevels(parentUrl){
     let rootUrl = parentUrl;
     rootUrl = rootUrl.concat('numCriteria=' + this.state.numCriteria + '&' );
     rootUrl = rootUrl.concat('numLevels=' + this.state.numLevels);
     return rootUrl;
   }
   appendMiscStuff(parentUrl){
     let rootUrl = parentUrl;
     rootUrl = rootUrl.concat('useCustomCriteria=' + this.state.useCustomCriteria + '&' );
     rootUrl = rootUrl.concat('useDefaults=' + this.state.useDefaults + '&' );
     rootUrl = rootUrl.concat('lockCriteriaNames=' + this.state.lockCriteriaNames + '&' );
     rootUrl = rootUrl.concat('lockAddCompany=' + this.state.lockAddCompany );
     rootUrl = rootUrl.concat('graphIsHidden=' + this.state.graphIsHidden );
     rootUrl = rootUrl.concat('saveName=' + this.state.saveName );
     return rootUrl;
   }

   /*
   lockCriteriaNames: false,
   lockAddCompany: false,
   */

   parseUrlQueryParams(){
     const values = queryString.parse(this.props.urlQueryString, {arrayFormat: 'index'});
     let newState = this.state;

     for(let i=0; i<values.data.length; i++){
       newState.data.push(JSON.parse(values.data[i]));
     }
     for(let i=0; i<values.companies.length; i++){
       newState.companies.push(JSON.parse(values.companies[i]));
     }


     newState.colors = values.colors;
     newState.individualNames = values.individualNames;
     newState.criteria = values.criteria;
     newState.numLevels = values.numLevels;
     newState.numCriteria = values.numCriteria;
     newState.lockCriteriaNames = values.lockCriteriaNames;
     newState.lockAddCompany = values.lockAddCompany;
     newState.graphIsHidden = values.graphIsHidden;
     newState.useCustomCriteria = values.useCustomCriteria;
     newState.useDefaults = values.useDefaults;
     newState.saveName = values.saveName;

     this.setState(newState);
   }

   /*
    * Tooltip Stuff
    */
    addBusinessTooltip(){
      return(
        <Tooltip id="addBusinessTooltipId">
          Add Business
        </Tooltip>
      );
    }
    addIndividualTooltip(){
      return(
        <Tooltip id="addIndividualsTooltipId">
          Add Individuals/Applicants
        </Tooltip>
      );
    }



    /*
     * React Methods
     */
   componentDidMount() {
     if(this.props.urlQueryString) this.parseUrlQueryParams();
   }











  render() {
    return(
      <div>
        {
          /*
           * *********************************
           * BEGIN: Project Banner
           * *********************************
           */
        }
        <Grid className="white_background">
          <Row>
            <Col sm={12}>
              <div className="banner_content"></div>
            </Col>
          </Row>
        </Grid>
        {
          /*
           * *********************************
           * END: Project Banner
           * *********************************
           */
        }
        {
          /*
           * *********************************
           * BEGIN: Project Skyrwriting
           * *********************************
           */
        }
        <Grid className="white_background">
          <Row>
            <Col xs={6}>
              <div>
                <h3><strong>Number Of Levels</strong></h3>
                <p>
                  How many levels do you want your chart to have?
                  Consider whether you would want to grade your company
                  and your candidates on a 4pt scale or less.
                </p>
              </div>
            </Col>
            <Col xs={6} >
              <div>
                <Slider
                  className="customNumLevelsSlider"
                  value={this.state.numLevels}
                  min={0}
                  max={4}
                  orientation="horizontal"
                  onChange={this.handleSlider_levelChange}
                  tooltip={true}
                />
              </div>
            </Col>
          </Row>
        </Grid>

        <Grid className="grey__fill1">
          <Row>
            <Col md={6}>
              <h3><strong>Criteria</strong></h3>
              <p>Set your criteria.  Feel free to add to, remove from, or edit the default list below:</p>
            </Col>
            <Col md={6}>
              <h3><Glyphicon glyph="briefcase" /> <strong>Company Ratings</strong></h3>
              <p>Set ratings for each criteria below.  0 means non-existent.  5 means top-notch!</p>
            </Col>
          </Row>

          {this.generateCriteriaInputFields()}

          <Row>
            <Col md={6}>
              <Row>
                <Col md={2}>
                </Col>
                <Col md={8}>
                  <Button bsSize="large" block>
                    <Glyphicon glyph="plus-sign"/> Add Another
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col md={5}>
              <Button bsStyle="primary" bsSize="large" block>
                Create Chart & Add Applicants
              </Button>
            </Col>
          </Row>
        </Grid>
        {
          /*
           * *********************************
           * END: Project Skyrwriting
           * *********************************
           */
        }
        {
          /*
           * *********************************
           * BEGIN: Footer
           * *********************************
           */
        }
        <Grid className="white_background">
          <Row>
            <Col sm={12}>
              <div className="footer_content"></div>
            </Col>
          </Row>
        </Grid>
        {
          /*
           * *********************************
           * END: Footer
           * *********************************
           */
        }
        {
          /*
           * *********************************
           * BEGIN: Modals
           * *********************************
           */
        }

        <Modal show={this.state.showModalForLoad} onHide={this.handleCloseForLoadModal}>
          <Modal.Header closeButton>
            <Modal.Title>Load Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Loading Data...</h4>
            <p>
              Please select the profile you wish to load and click 'Load'.
            </p>
            <hr />
            <h4>Saved Profiles</h4>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select</ControlLabel>
              {this.wrapperForLoadDeleteDownloadSelect()}
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={this.loadData}>Load</Button>
              <Button onClick={this.deleteData}>Delete</Button>
              <Button onClick={this.handleCloseForLoadModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showModalForDownload} onHide={this.handleCloseForDownloadModal}>
          <Modal.Header closeButton>
            <Modal.Title>Download Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Downloading Data...</h4>
            <p>
              Please select the profile you wish to download.
            </p>
            <hr />
            <h4>Saved Profiles</h4>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select</ControlLabel>
              {this.wrapperForLoadDeleteDownloadSelect()}
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={this.downloadData}>Download</Button>
              <Button onClick={this.handleCloseForDownloadModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showModalForImport} onHide={this.handleCloseForImportModal}>
          <Modal.Header closeButton>
            <Modal.Title>Import Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Importing Data...</h4>
            <p>
              Please select the file you wish to import.
            </p>
            <hr />
            <h4>Load File</h4>
            <FormGroup controlId="formControlsLoadFile">
              <FormControl
                accept='.json'
                onChange={this.handleImportData}
                label="File"
                type="file"
                name="fileToImport" />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={this.importData}>Import</Button>
              <Button onClick={this.handleCloseForImportModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showModalForDefaultRatingScale} onHide={this.handleCloseForDefaultRatingScaleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Default Rating Scale</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>0 - No meaningful function in place</h4>
            <h4>1 - Minimal ability to execute, no dedicated staff</h4>
            <h4>2 - Some ability to execute, some staff, low experience</h4>
            <h4>3 - Moderate ability to execute, some staff, some experience</h4>
            <h4>4 - Excellent ability to execute, fully staffed, high experience</h4>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={this.handleCloseForDefaultRatingScaleModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showModalForInfoOnTypesOfUsers} onHide={this.handleCloseForTypesOfUsersModal}>
          <Modal.Header closeButton>
            <Modal.Title>Use Cases</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Product Manager</h4>
            <p>
              Developing skills and experience to develop a focus area or balance as a generalist; a product manager
              needs to communicate clearly and easily their profile to supervisors and hiring managers.
              <ul>
                <li>As a product manager, I want to visualize my own skills and experience so that I see areas to learn new skills and focus my development.</li>
                <li>As a product manager, I want to share a visual representation of my strengths to my network on LinkedIn so that I better communicate my skills and experience to employers.</li>
              </ul>
            </p>
            <h4>Head of Product Development</h4>
            <p>
              Building a team, either from scratch or expanding an existing team; the head of product development needs to
              decide what training is needed for self and team, what skills and experience to hire in; needs to balance own
              areas of focus and time across areas; needs to communicate to colleagues the profile and focus areas of the team.
              <ul>
                <li>As a head of product development, I want to visualize the strengths of my team so that I understand the skills I need to hire or train.</li>
                <li>As a head of product, I want to visualize the strengths of my team and the strengths of each department so that I understand the gaps that I need to fill.</li>
              </ul>
            </p>
            <h4>Startup Founder</h4>
            <p>
              Has been acting as product manager, knowingly or unknowingly, and now is thinking about hiring in a first product
              manager or head of product; needs to understand and communicate their own needs both to external candidates or
              recruiters and to internal stakeholders.
              <ul>
                <li>As a startup founder, I want to visualize the strength of each department and my own strengths so that I hire a head of product who can focus on the areas we are weakest.</li>
              </ul>
            </p>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={this.handleCloseForTypesOfUsersModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        {
          /*
           * *********************************
           * END: Modals
           * *********************************
           */
        }

      </div>
    );
  }
}
/*
{'axis':'Customers', 'value': 0},
{'axis':'Sales', 'value': 0},
{'axis':'Software Engineering', 'value': 0},
{'axis':'Hardware Engineering', 'value': 0},
{'axis':'Project Management', 'value': 0},
{'axis':'UX Design', 'value': 0},
{'axis':'Graphic Design', 'value': 0},
{'axis':'Strategic Partners', 'value': 0},
{'axis':'Channel Partners', 'value': 0},
{'axis':'Research', 'value': 0},
{'axis':'Operations', 'value': 0},
{'axis':'Advertising & Promotions', 'value': 0},
{'axis':'Product Evangelism', 'value': 0},
{'axis':'Finance', 'value': 0},
{'axis':'Supply Chain Management', 'value': 0},
{'axis':'Press & Analysts', 'value': 0},
{'axis':'Investor Relations' 'value': 0}
*/
export default ProjectSkywritingDemo;
