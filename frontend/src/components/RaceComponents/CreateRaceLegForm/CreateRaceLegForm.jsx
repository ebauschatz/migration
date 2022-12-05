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
                    name="address"
                    onChange={props.handleInputChange}
                    value={props.formData.address}
                />
                <br />
                <label>Leg End City:</label>
                <input
                    type="text"
                    required={true}
                    name="city"
                    onChange={props.handleInputChange}
                    value={props.formData.city}
                />
                <br />
                <label>Leg End State:</label>
                <input
                    type="text"
                    required={true}
                    name="state"
                    onChange={props.handleInputChange}
                    value={props.formData.state}
                />
                <br />
                <label>Leg End Zip Code:</label>
                <input
                    type="text"
                    required={true}
                    name="zip"
                    onChange={props.handleInputChange}
                    value={props.formData.zip}
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