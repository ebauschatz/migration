import './CreateRaceLegForm.css'

const CreateRaceLegForm = (props) => {
    return (
        <div className="leg-form-container">
            <form className="leg-form">
                <label>Number: </label>
                <input
                    type="text"
                    required={true}
                    name="legNumber"
                    onChange={props.handleInputChange}
                    value={props.formData.legNumber}
                />
                <label>Distance: </label>
                <input
                    type="text"
                    required={true}
                    name="legDistance"
                    onChange={props.handleInputChange}
                    value={props.formData.legDistance}
                />
                <label>End Street Address:</label>
                <input
                    type="text"
                    required={true}
                    name="address"
                    onChange={props.handleInputChange}
                    value={props.formData.address}
                />
                <label>End City:</label>
                <input
                    type="text"
                    required={true}
                    name="city"
                    onChange={props.handleInputChange}
                    value={props.formData.city}
                />
                <label>End State:</label>
                <input
                    type="text"
                    required={true}
                    name="state"
                    onChange={props.handleInputChange}
                    value={props.formData.state}
                />
                <label>End Zip Code:</label>
                <input
                    type="text"
                    required={true}
                    name="zip"
                    onChange={props.handleInputChange}
                    value={props.formData.zip}
                />
            </form>
            <div>
                <button type="button" className="leg-form-button" onClick={() => props.handleValidateAddress(props.formData, props.setPlaceId)}>Validate Address</button>
            </div>
            <div>
                <button type="button" className="leg-form-button" onClick={props.handleFormReset}>Reset</button>
                <button type="submit" className="leg-form-button" onClick={props.handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
 
export default CreateRaceLegForm;