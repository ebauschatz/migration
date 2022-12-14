import './CreateRaceForm.css';

const CreateRaceForm = (props) => {
    return (
        <div className="form-container">
            <form className="race-form">
                <label>Race Name:</label>
                <input className="form-field"
                    type="text"
                    required={true}
                    name="raceName"
                    onChange={props.handleInputChange}
                    value={props.formData.raceName}
                />
                <label>Race Start Date:</label>
                <input className="form-field"
                    type="date"
                    required={true}
                    name="raceStartDate"
                    onChange={props.handleInputChange}
                    value={props.formData.raceStartDate}
                />
                <label>Race Finish Opens:</label>
                <input className="form-field"
                    type="datetime-local"
                    required={true}
                    name="raceFinishOpens"
                    onChange={props.handleInputChange}
                    value={props.formData.raceFinishOpens}
                />
                <label>Race Finish Closes:</label>
                <input className="form-field"
                    type="datetime-local"
                    required={true}
                    name="raceFinishCloses"
                    onChange={props.handleInputChange}
                    value={props.formData.raceFinishCloses}
                />
                <label>Race Start Street Address:</label>
                <input className="form-field"
                    type="text"
                    required={true}
                    name="address"
                    onChange={props.handleInputChange}
                    value={props.formData.address}
                />
                <label>Race Start City:</label>
                <input className="form-field"
                    type="text"
                    required={true}
                    name="city"
                    onChange={props.handleInputChange}
                    value={props.formData.city}
                />
                <label>Race Start State:</label>
                <input className="form-field"
                    type="text"
                    required={true}
                    name="state"
                    onChange={props.handleInputChange}
                    value={props.formData.state}
                />
                <label>Race Start Zip Code:</label>
                <input className="form-field"
                    type="text"
                    required={true}
                    name="zip"
                    onChange={props.handleInputChange}
                    value={props.formData.zip}
                />
            </form>
            <div className="button-container">
                <button type="button" onClick={props.handleValidateAddress} className="form-button">Validate Address</button>
            </div>
            <div className="button-container">
                <button type="button" onClick={props.handleReset} className="form-button">Reset</button>
                <button type="submit" onClick={props.handleFormSubmit} className="form-button">Submit</button>
            </div>
        </div>
    );
}
 
export default CreateRaceForm;