import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

function TextInput({name, placeholder, onChange, onKeyDown, formData}) {
    return (
        <input
            required
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            name={name}
            value={formData[name]}
        />
    )
}

function TextInputSet({onChange, onKeyDown, formData, textInputs}) {

    return textInputs.map(input => (
        <TextInput
            key={input.name}
            onChange={onChange}
            onKeyDown={onKeyDown}
            formData={formData}
            {...input}
        />
    ))
}

function RadioInput({label, value, onChange, onKeyDown, formData}) {
    return (
        <div className="radio-container">
            <input
                required
                type="radio"
                onChange={onChange}
                onKeyDown={onKeyDown}
                checked={formData.employment === value}
                name="employment"
                value={value}
            />
            <label htmlFor={value}>{label}</label>
        </div>
    )
}

function RadioInputSet({legend, onChange, onKeyDown, formData, radios}) {

    const radioElements = radios.map(radio => (
        <RadioInput
            key={radio.value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            formData={formData}
            {...radio}
        />
    ))

    return (
        <fieldset>
            <legend>{legend}</legend>
            {radioElements}
        </fieldset>
    )
}

function App() {

    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        comments: "",
        isFriendly: false,
        employment: "",
        favouriteColor: ""
    })

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(formData => ({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    function handleKeyDown(event) {
        const {key, target} = event
        const form = target.form
        if (key === "ArrowDown" || key === "ArrowUp") {
            event.preventDefault()
            const index = Array.from(form).indexOf(target)

            let nextItem = form[index + 1]
            let prevItem = form[index - 1]

            if (nextItem?.tagName === "FIELDSET")
                nextItem = form[index + 2]
            if (prevItem?.tagName === "FIELDSET")
                prevItem = form[index - 2]

            if (key === "ArrowDown")
                nextItem?.focus()
            else if (key === "ArrowUp")
                prevItem?.focus()
        }
        else if (key === "Enter" && (target.type === "checkbox" || target.type === "radio")) {
            event.preventDefault()
            target.checked = !target.checked
            handleChange(event)
        }
        else if (key === "Enter" && target.type !== "submit" && target.tagName !== "SELECT") {
            event.preventDefault()
        }
    }

    function submit(event) {
        event.preventDefault()
        console.log(formData)
    }

    return (
        <div className="app">
            <form className="form" onSubmit={submit}>
                <TextInputSet
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    formData={formData}
                    textInputs={[
                        {placeholder: "First name", name: "firstName"},
                        {placeholder: "Last name", name: "lastName"},
                        {placeholder: "Email", name: "email"}
                    ]}
                />

                <textarea
                    placeholder="Any comments?"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="comments"
                    value={formData.comments}
                />

                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="isFriendly"
                        checked={formData.isFriendly}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        name="isFriendly"
                    />
                    <label htmlFor="isFriendly">Are you Friendly?</label>
                </div>

                <RadioInputSet
                    legend="Current employment status"
                    formData={formData}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    radios={[
                        {value: "unemployed", label: "Unemployed"},
                        {value: "part-time", label: "Part-time"},
                        {value: "full-time", label: "Full-time"},
                    ]}
                />

                <select
                    id="favouriteColor"
                    required
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    name="favouriteColor"
                    value={formData.favouriteColor}>
                    <option value="" className="default-option">-- Your favourite color --</option>
                    <option value="red">Red</option>
                    <option value="orange">Orange</option>
                    <option value="yellow">Yellow</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="indigo">Indigo</option>
                    <option value="violet">Violet</option>
                </select>

                <button className="submit-button" onKeyDown={handleKeyDown}>Submit</button>
            </form>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>)