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
                    name="raceAddress"
                    onChange={props.handleInputChange}
                    value={props.formData.raceAddress}
                />
                <br />
                <label>Race Start City:</label>
                <input
                    type="text"
                    required={true}
                    name="raceCity"
                    onChange={props.handleInputChange}
                    value={props.formData.raceCity}
                />
                <br />
                <label>Race Start State:</label>
                <input
                    type="text"
                    required={true}
                    name="raceState"
                    onChange={props.handleInputChange}
                    value={props.formData.raceState}
                />
                <br />
                <label>Race Start Zip Code:</label>
                <input
                    type="text"
                    required={true}
                    name="raceZip"
                    onChange={props.handleInputChange}
                    value={props.formData.raceZip}
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