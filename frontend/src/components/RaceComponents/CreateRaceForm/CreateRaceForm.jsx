const CreateRaceForm = (props) => {
    return (
        <div>
            <form>
                <label>Race Name:</label>
                <input 
                    type="text"
                    required={true}
                    name="raceName"
                    onChange={props.handleInputChange}
                    value={props.formData.raceName}
                />
                <br />
                <label>Race Start Date:</label>
                <input
                    type="date"
                    required={true}
                    name="raceStartDate"
                    onChange={props.handleInputChange}
                    value={props.formData.raceStartDate}
                />
                <br />
                <label>Race Finish Opens:</label>
                <input
                    type="datetime-local"
                    required={true}
                    name="raceFinishOpens"
                    onChange={props.handleInputChange}
                    value={props.formData.raceFinishOpens}
                />
                <br />
                <label>Race Finish Closes:</label>
                <input
                    type="datetime-local"
                    required={true}
                    name="raceFinishCloses"
                    onChange={props.handleInputChange}
                    value={props.formData.raceFinishCloses}
                />
                <br />
                <label>Race Start Street Address:</label>
                <input
                    type="text"
                    required={true}
                    name="address"
                    onChange={props.handleInputChange}
                    value={props.formData.address}
                />
                <br />
                <label>Race Start City:</label>
                <input
                    type="text"
                    required={true}
                    name="city"
                    onChange={props.handleInputChange}
                    value={props.formData.city}
                />
                <br />
                <label>Race Start State:</label>
                <input
                    type="text"
                    required={true}
                    name="state"
                    onChange={props.handleInputChange}
                    value={props.formData.state}
                />
                <br />
                <label>Race Start Zip Code:</label>
                <input
                    type="text"
                    required={true}
                    name="zip"
                    onChange={props.handleInputChange}
                    value={props.formData.zip}
                />
                <br />
                <button type="button" onClick={props.handleValidateAddress}>Validate Address</button>
                <button type="button" onClick={props.handleReset}>Reset</button>
                <button type="submit" onClick={props.handleFormSubmit}>Submit</button>
            </form>
        </div>
    );
}
 
export default CreateRaceForm;