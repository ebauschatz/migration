const CreateRaceLegForm = (props) => {
    return (
        <div>
            <h4>Add A New Leg</h4>
            <form>
                <label>Leg Number: </label>
                <input
                    type="text"
                    required={true}
                    name="legNumber"
                    onChange={props.handleInputChange}
                    value={props.formData.legNumber}
                />
                <br />
                <label>Leg Distance: </label>
                <input
                    type="text"
                    required={true}
                    name="legDistance"
                    onChange={props.handleInputChange}
                    value={props.formData.legDistance}
                />
                <br />
                <label>Leg End Street Address:</label>
                <input
                    type="text"
                    required={true}
                    name="legAddress"
                    onChange={props.handleInputChange}
                    value={props.formData.legAddress}
                />
                <br />
                <label>Leg End City:</label>
                <input
                    type="text"
                    required={true}
                    name="legCity"
                    onChange={props.handleInputChange}
                    value={props.formData.legCity}
                />
                <br />
                <label>Leg End State:</label>
                <input
                    type="text"
                    required={true}
                    name="legState"
                    onChange={props.handleInputChange}
                    value={props.formData.legState}
                />
                <br />
                <label>Leg End Zip Code:</label>
                <input
                    type="text"
                    required={true}
                    name="legZip"
                    onChange={props.handleInputChange}
                    value={props.formData.legZip}
                />
                <br />
                <button type="button" onClick={props.handleValidateAddress}>Validate Address</button>
                <button type="button" onClick={props.handleFormReset}>Reset</button>
                <button type="submit" onClick={props.handleSubmit}>Submit</button>
            </form>
        </div>
    );
}
 
export default CreateRaceLegForm;