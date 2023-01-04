import Select from "react-select"

const SelectDropdown = ({ options, placeholder, onChange, isMulti = false }) => {
    return (
        <div>
            <Select options={options} placeholder={placeholder} onChange={onChange} isMulti={isMulti} />
        </div>
    )
}

export default SelectDropdown
