import React, { Component } from 'react';
import { Col, Row, Button, Modal, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './user.css';
import axios from 'axios';
class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			onHideForm: false,
			editId: '',
			dyanamicBtnName: 'Submit',
			update: false,
			id: '',
			showHide: '',
			Name: '',
			Collage: '',
			Gender: '',
			birthDate: '',
			Hobbies: '',
			userName: 'admin123',
			errors: {},
			collages: '',
			data: []
		};
	}
	componentDidMount() {
		this.onGetUserData();
	}
	handleValidation() {
		let Gender = this.state.Gender;
		let Name = this.state.Name;
		let birthDate = this.state.birthDate;
		let Address = this.state.Address;
		let Collage = this.state.Collage;
		let Hobbies = this.state.Hobbies;
		let errors = {};
		let formIsValid = true;

		//==================Name======================
		if (!Name) {
			formIsValid = false;
			errors['inputName'] = 'Cannot be empty';
		} else if (typeof Name !== 'undefined') {
			if (!Name.match(/[\D][a-zA-Z\Da-zA-Z][\D]+$/g)) {
				formIsValid = false;
				errors['inputName'] = 'Only letters';
			}
		}
		//=================Address=======================
		if (!Address) {
			formIsValid = false;
			errors['inputAddress'] = 'Cannot be empty';
		} else if (typeof Address !== 'undefined') {
			if (!String(Address).match(/[a-zA-Z]+$/i)) {
				formIsValid = false;
				errors['inputAddress'] = 'Only letters';
			}
		}
		if (!birthDate) {
			formIsValid = false;
			errors['inputBirthDate'] = 'Cannot be empty';
		}
		if (!Gender) {
			formIsValid = false;
			errors['inputGender'] = 'Cannot be empty';
		}
		if (!Hobbies) {
			formIsValid = false;
			errors['inputHobbies'] = 'Cannot be empty';
		}
		if (!Collage) {
			formIsValid = false;
			errors['inputCollage'] = 'Cannot be empty';
		} else if (typeof Collage !== 'undefined') {
			if (!Collage.match(/[\D][a-zA-Z\Da-zA-Z][\D]+$/g)) {
				formIsValid = false;
				errors['inputCollage'] = 'Only letters & also check for any Space';
			}
		}
		this.setState({
			errors: errors
		});
		return formIsValid;
	}
	onGetUserData = async () => {
		axios
			.get('https://user-83160-default-rtdb.firebaseio.com/.json?apiKey=AIzaSyAQMy3h40rz67a1vmcWGMQNKMXKNWLCVTU')
			.then((res) => {
				console.log(res);
				this.setState({ data: res.data.User });
			});
	};
	onSubmitHandler = async () => {
		this.state.showHide = false;
		const data = {
			Name: this.state.Name,
			Gender: this.state.Gender,
			Address: this.state.Address,
			birthDate: this.state.birthDate,
			Collage: this.state.Collage,
			Hobbies: this.state.Hobbies
		};
		if (this.state.editId === '') {
			if (this.handleValidation()) {
				await axios
					.post(
						'https://user-83160-default-rtdb.firebaseio.com/.json?apiKey=AIzaSyAQMy3h40rz67a1vmcWGMQNKMXKNWLCVTU',
						data
					)
					.then((res) => {
						this.onGetUserData();
						this.handleReset();
						this.setState({ onHideForm: !this.state.onHideForm });
						alert('User Added Successfully');
					});
			} else {
				console.log('fill the form ');
			}
		} else {
			if (this.handleValidation()) {
				await axios
					.patch(
						'https://user-83160-default-rtdb.firebaseio.com/.json?apiKey=AIzaSyAQMy3h40rz67a1vmcWGMQNKMXKNWLCVTU',
						data
					)
					.then((res) => {
						this.onGetUserData();
						this.setState({ onHideForm: !this.state.onHideForm, editId: '' });
						this.handleReset();
					});
			} else {
				console.log('form is Not Updated');
			}
		}
	};
	onRemoveData = async (id) => {
		await axios
			.delete(
				'https://user-83160-default-rtdb.firebaseio.com/.json?apiKey=AIzaSyAQMy3h40rz67a1vmcWGMQNKMXKNWLCVTU/_id=',
				this.state.data.id
			)
			.then(() => {
				console.log(this.state.data._id);
				const newData = this.state.data.filter((obj) => obj._id !== this.state.editId);
				this.setState({ data: newData, showHide: false, editId: '' });
			});
	};
	onEditData = async (id) => {
		const newData = this.state.data.filter((obj) => obj._id === id)[0];
		this.setState({
			Name: newData.Name,
			Gender: newData.Gender,
			Address: newData.Address,
			Collage: newData.Collage,
			Hobbies: newData.Hobbies,
			birthDate: newData.birthDate,
			editId: newData._id,
			dyanamicBtnName: 'Update'
		});
	};
	handleModalShow = (id) => {
		this.setState({ showHide: !false, editId: id });
	};
	handleModalHide = () => {
		this.setState({ showHide: false, editId: '' });
	};
	handleReset = (form) => {
		this.setState({
			Name: '',
			Gender: '',
			Address: '',
			birthDate: '',
			Hobbies: '',
			Collage: '',
			errors: ''
		});
	};
	handleManualReset = () => {
		this.form.reset();
	};
	onHideForm = () => {
		return !this.state.onHideForm ? (
			this.onHideForm()
		) : (
			<div className="form-container">
				<form
					onSubmit={() => this.setState({ onHideForm: false, dyanamicBtnName: 'Submit' })}
					ref={(form) => (this.form = form)}
					onReset={this.handleReset}
				>
					<Row>
						<div className="form-group col-12 col-md-6">
							<label for="inputName" className="col-form-label">
								Name
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="inputName"
								placeholder="Enter Name"
								onChange={(e) => {
									this.setState({ Name: e.target.value });
								}}
								value={this.state.Name}
								ref="inputName"
								required
							/>
							<div className="error-msg">{this.state.errors['inputName']}</div>
						</div>
						<div className="form-group col-12 col-md-6">
							<label for="inputBirthDate" className="col-form-label">
								Birth Date
							</label>
							<input
								type="date"
								className="form-control form-input"
								id="inputBirthDate"
								placeholder="Enter Birth Date"
								onChange={(e) => {
									this.setState({ birthDate: e.target.value });
								}}
								value={this.state.birthDate}
								ref="inputBirthDate"
								required
							/>
							<div className="error-msg">{this.state.errors['inputBirthDate']}</div>
						</div>
					</Row>
					<Row>
						<div className="form-group col-12 col-md-6">
							<label for="inputGender" className="col-form-label">
								Gender
							</label>
							<div>
								<input
									type="radio"
									value="Male"
									name="gender"
									onChange={(e) => {
										this.setState({ Gender: e.target.value });
									}}
									ref="inputGender"
								/>{' '}
								Male
								<input
									type="radio"
									value="Female"
									name="gender"
									onChange={(e) => {
										this.setState({ Gender: e.target.value });
									}}
									ref="inputGender"
								/>{' '}
								Female
								<input
									type="radio"
									value="Other"
									name="gender"
									onChange={(e) => {
										this.setState({ Gender: e.target.value });
									}}
									ref="inputGender"
								/>{' '}
								Other
							</div>
							<div className="error-msg">{this.state.errors['inputGender']}</div>
						</div>
						<div className="form-group col-12 col-md-6">
							<label for="inputAddress" className="col-form-label">
								Address
							</label>
							<textarea
								className="form-control form-input"
								id="inputAddress"
								placeholder="Enter Address"
								onChange={(e) => {
									this.setState({ Address: e.target.value });
								}}
								value={this.state.Address}
								ref="inputAddress"
								required
							/>
							<div className="error-msg">{this.state.errors['inputAddress']}</div>
						</div>
					</Row>
					<Row>
						{/* <Row>
						<div className="dropdown">
							<div className="control">
								<div className="selected-value">Select Collage...</div>
								<div className="arrow" />
							</div>
							<div className="options">
								<div className="option">
									{this.collages.map((collages) => (
										<div className="option">
											{'http://universities.hipolabs.com/search?name=' + collages}
										</div>
									))}
								</div>
							</div>
						</div>
					</Row> */}
						<div className="form-group col-12 col-md-6">
							<label for="inputCollage" className="col-form-label">
								Collage
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="inputCollage"
								onChange={(e) => {
									this.setState({ Collage: e.target.value });
								}}
								value={this.state.Collage}
								placeholder="Enter Collage"
								ref="inputCollage"
								required
							/>
							<div className="error-msg">{this.state.errors['inputCollage']}</div>
						</div>
						<div className="form-group col-12 col-md-6">
							<label for="inputHobbies" className="col-form-label">
								Hobbies:
							</label>
							<br />
							<input
								type="checkbox"
								id="inputHobbies"
								onChange={(e) => {
									this.setState({ Hobbies: e.target.value });
								}}
								value="Cricket"
								ref="inputHobbies"
							/>Cricket<br />
							<input
								type="checkbox"
								id="inputHobbies"
								onChange={(e) => {
									this.setState({ Hobbies: e.target.value });
								}}
								value="Reading"
								ref="inputHobbies"
							/>Reading<br />
							<input
								type="checkbox"
								id="inputHobbies"
								onChange={(e) => {
									this.setState({ Hobbies: e.target.value });
								}}
								value="Singing"
								ref="inputHobbies"
							/>Singing
							<input
								type="checkbox"
								id="inputHobbies"
								onChange={(e) => {
									this.setState({ Hobbies: e.target.value });
								}}
								value="Other"
								ref="inputHobbies"
							/>Other
							<div className="error-msg">{this.state.errors['inputHobbies']}</div>
						</div>
					</Row>
					<div className="text-center">
						<button
							type="button"
							className="submit-button"
							onClick={() => {
								this.onSubmitHandler();
							}}
						>
							{this.state.dyanamicBtnName}
						</button>
						<button
							type="reset"
							className="cancel-button"
							onClick={() => {
								this.setState({ onHideForm: !this.state.onHideForm });
								this.handleManualReset();
							}}
							value="reset"
							default
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		);
	};
	render() {
		return (
			<div className="jumbotron jumbo-form">
				<Row>
					<Col>
						<h5 className="page-heading align-middle">ADD USER</h5>
					</Col>
					<Col className="d-flex flex-row-reverse">
						{this.state.onHideForm ? (
							!this.onHideForm()
						) : (
							<button
								className="submit-button"
								onClick={() => this.setState({ onHideForm: true, dyanamicBtnName: 'Submit' })}
							>
								ADD
							</button>
						)}
					</Col>
				</Row>
				<hr className="hr-line" />
				<div>
					{this.state.onHideForm ? (
						this.onHideForm()
					) : (
						<div className="table-responsive">
							<Table striped borderless hover>
								<thead>
									<tr>
										<th>Name</th>
										<th>Birth Date</th>
										<th>Address</th>
										<th>Gender</th>
										<th>collage</th>
										<th>Hobbies</th>
										<th>Edit / Delete</th>
									</tr>
								</thead>
								<tbody>
									{this.state.data.map((data) => (
										<tr key={data}>
											<td>{data.Name}</td>
											<td>{data.birthDate}</td>
											<td>{data.Address}</td>
											<td>{data.Gender}</td>
											<td>{data.Collage}</td>
											<td>{data.Hobbies}</td>

											<td>
												<button
													className="editbutton"
													onClick={this.onEditData.bind(this, data._id)}
												>
													<FaEdit
														className="svgedit"
														onClick={() => this.setState({ onHideForm: true })}
													/>
												</button>
												<button
													className="deletebutton"
													onClick={this.handleModalShow.bind(this, data._id)}
												>
													<FaTrash className="svgdelete" />
												</button>

												<Modal show={this.state.showHide}>
													<Modal.Body>
														<h6>Are you sure ! Delete this Data ?</h6>
													</Modal.Body>
													<Modal.Footer>
														<Button onClick={this.onRemoveData}>Delete</Button>
														<Button onClick={this.handleModalHide}>Close</Button>
													</Modal.Footer>
												</Modal>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					)}
				</div>
			</div>
		);
	}
}
export default User;
