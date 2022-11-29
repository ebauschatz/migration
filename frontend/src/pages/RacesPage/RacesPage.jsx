import useCustomForm from '../../hooks/useCustomForm';

const RacesPage = (props) => {
    const initialValues = {
        raceName: "",
        raceStartDate: "",
        raceAddress1: "",
        raceAddress2: "",
        raceCity: "",
        raceState: "",
        raceZip: ""
    };
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(initialValues, handleFormSubmit);

    function handleReset() {
        reset();
    }

    

    function handleFormSubmit() {
        console.log("form submitted");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Race Name:</label>
                <input 
                    type="text"
                    required={true}
                    name="raceName"
                    onChange={handleInputChange}
                    value={formData.raceName}
                />
                <br />
                <label>Race Start Date:</label>
                <input
                    type="date"
                    required={true}
                    name="raceStartDate"
                    onChange={handleInputChange}
                    value={formData.raceStartDate}
                />
                <br />
                <label>Race Start Address Line 1:</label>
                <input
                    type="text"
                    required={true}
                    name="raceAddress1"
                    onChange={handleInputChange}
                    value={formData.raceAddress1}
                />
                <br />
                <label>Race Start Address Line 2:</label>
                <input
                    type="text"
                    required={true}
                    name="raceAddress2"
                    onChange={handleInputChange}
                    value={formData.raceAddress2}
                />
                <br />
                <label>Race Start City:</label>
                <input
                    type="text"
                    required={true}
                    name="raceCity"
                    onChange={handleInputChange}
                    value={formData.raceCity}
                />
                <br />
                <label>Race Start State:</label>
                <input
                    type="text"
                    required={true}
                    name="raceState"
                    onChange={handleInputChange}
                    value={formData.raceState}
                />
                <br />
                <label>Race Start Zip Code:</label>
                <input
                    type="text"
                    required={true}
                    name="raceZip"
                    onChange={handleInputChange}
                    value={formData.raceZip}
                />
                <br />
                <button type="button" onClick={handleReset}>Validate Address</button>
                <button type="button" onClick={handleReset}>Reset</button>
                <button type="submit" onClick={handleFormSubmit}>Submit</button>
            </form>
        </div>
    );
}
 
export default RacesPage;