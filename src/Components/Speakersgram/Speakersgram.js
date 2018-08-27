import React from "react";
import {FormControl, FormGroup, ControlLabel, Button, Col, Row,Grid,Image, Modal, Popover} from 'react-bootstrap';
import ReactHTMLConverter from 'react-html-converter/node';
import "./Speakersgram.css";
import html2canvas from 'html2canvas';

class Speakersgram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            title:'',
            company:'',
            discription:'',
            image:null,
            show: false,
            modal: "https://cbsnews1.cbsistatic.com/hub/i/2018/08/26/c5c28efc-c187-4512-9ff8-355c13532834/cbsn-fusion-senator-john-mccain-has-died-at-the-age-of-81-thumbnail-1643605-640x360.jpg"
        };

        this.handleChange = this.handleChange.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        })

    };

fileChangedHandler = (event) => {
    this.setState({
        image: URL.createObjectURL(event.target.files[0])
    })
}

handleClose() {
    this.setState({ show: false });
}

async handleShow () {
    let canvas = await html2canvas(document.getElementById("my-node")).then(function(canvas) {
        console.log(canvas)
        return canvas
    });
    console.log(canvas)
    this.setState({modal:canvas.toDataURL(), show: true});
}


render() {
    const popover = (
        <Popover id="modal-popover" title="popover">
            very popover. such engagement
        </Popover>
    );


    return (

        <Grid>
            <Row>
                <Col md={4} mdOffset={2} >
                    <form>

                        <FormGroup controlId="formControlsText">
                            <ControlLabel>Name</ControlLabel>
                            <FormControl type="text" placeholder="Enter text" name= "name" onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup controlId="formControlsText">
                            <ControlLabel>Title</ControlLabel>
                            <FormControl type="text" placeholder="Enter text" name= "title" onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup controlId="formControlsText">
                            <ControlLabel>Company</ControlLabel>
                            <FormControl type="text" placeholder="Enter text" name= "company" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="formControlsText">
                            <ControlLabel>Discription</ControlLabel>
                            <FormControl componentClass="textarea" type="text" placeholder="Enter text" name= "discription" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup controlId="">
                            <ControlLabel>Image</ControlLabel>
                            <FormControl type="file" name= "image" onChange={this.fileChangedHandler} />
                        </FormGroup>

                    </form>
                </Col>  

                <Col md={4} id="my-node" >

                    <h2>{this.state.name}</h2>
                    <h3>{this.state.title.charAt(0).toUpperCase() + this.state.title.slice(1)}{this.state.company ? ", " + this.state.company.charAt(0).toUpperCase() + this.state.company.slice(1) : ""}</h3>
                    <p>{this.state.discription}</p>
                    <Image className="image" rounded src={this.state.image} />

                </Col>

            </Row>

            <Row>
                <Col md={4}  mdOffset={2} id="my-node" >
                </Col>
                <Col md={4} id="my-node" >
                    <Button onClick={this.handleShow} bsStyle="warning">Preview</Button>
                </Col>

            </Row>
            <Row>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Image className="canvas" rounded src={this.state.modal} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>


            </Row>
        </Grid>
    );
}

}

export default Speakersgram;
