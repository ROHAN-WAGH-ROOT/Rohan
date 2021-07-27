import React, { Component } from 'react';
import { Col, Row, Table, Modal, Button } from 'react-bootstrap';
import './user.css';
class UserBankDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			onHideForm: false,
			editId: '',
			dyanamicBtnName: 'Submit',
			update: false,
			id: '',
			showHide: '',
			branchName: '',
			bankName: '',
			accountNum: '',
			ifscCode: '',
			userName: 'admin123',
			errors: {},
			data: []
		};
	}

	render() {
		return (
			<div className="form-container">
				<form onSubmit={() => this.setState({ onHideForm: false, dyanamicBtnName: 'Submit' })}>
					<Row>
						<div className="form-group col-12 col-md-6">
							<label for="inputBankName" className="col-form-label">
								Name of Bank
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="inputBankName"
								placeholder="Enter Bank Name"
								onChange={(e) => {
									this.setState({ bankName: e.target.value });
								}}
								value={this.state.bankName}
								ref="inputBankName"
								required
							/>
							<div className="error-msg">{this.state.errors['inputBankName']}</div>
						</div>
						<div className="form-group col-12 col-md-6">
							<label for="inputIfscCode" className="col-form-label">
								IFSC Code
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="inputIfscCode"
								placeholder="Enter IFSC code"
								onChange={(e) => {
									this.setState({ ifscCode: e.target.value });
								}}
								value={this.state.ifscCode}
								ref="inputIfscCode"
								required
							/>
							<div className="error-msg">{this.state.errors['inputIfscCode']}</div>
						</div>
					</Row>
					<Row>
						<div className="form-group col-12 col-md-6">
							<label for="inputBranchAddress" className="col-form-label">
								Branch Address
							</label>
							<input
								type="text"
								className="form-control form-input"
								id="inputBranchAddress"
								placeholder="Enter Branch Address"
								onChange={(e) => {
									this.setState({ branchName: e.target.value });
								}}
								value={this.state.branchName}
								ref="inputBranchAddress"
								required
							/>
							<div className="error-msg">{this.state.errors['inputBranchAddress']}</div>
						</div>
						<div className="form-group col-12 col-md-6">
							<label for="inputAccountNumber" className="col-form-label">
								Account Number
							</label>
							<input
								type="number"
								className="form-control form-input"
								id="inputAccountNumber"
								placeholder="Enter Account Number"
								onChange={(e) => {
									this.setState({ accountNum: e.target.value });
								}}
								value={this.state.accountNum}
								ref="inputAccountNumber"
								required
							/>
							<div className="error-msg">{this.state.errors['inputAccountNumber']}</div>
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
				<div className="jumbotron jumbo-form">
					<Row>
						<Col>
							<h5 className="page-heading align-middle">Bank Details</h5>
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
								<Table striped bordered hover>
									<thead>
										<tr>
											<th>Name Of Bank</th>
											<th>IFSC Code</th>
											<th>Branch Address</th>
											<th>Account Number</th>
											<th>Edit / Delete</th>
										</tr>
									</thead>
									<tbody>
										{this.state.data.map((data) => (
											<tr key={data}>
												<td>{data.bankName}</td>
												<td>{data.ifscCode}</td>
												<td>{data.branchName}</td>
												<td>{data.accountNum}</td>
												<td>
													<button
														className="editbutton"
														onClick={this.onEditData.bind(this, data._id)}
													/>
													<button
														className="deletebutton"
														onClick={this.handleModalShow.bind(this, data._id)}
													/>

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
			</div>
		);
	}
}
export default UserBankDetails;
