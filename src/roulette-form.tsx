import React from "react";
import "./roulette-form.css";

interface RouletteFormProps {
    data: PrizeData[];
    setData: (newData: PrizeData[]) => void;
}

export interface PrizeData {
    id: number;
    option: string;
    image: { uri: string } | null;
}

export function RouletteForm({
    data,
    setData,
}: RouletteFormProps): JSX.Element {
    const handleAddField = () => {
        const newId = Date.now();
        setData([...data, { id: newId, option: "", image: null }]);
    };

    const handleRemoveField = (id) => {
        console.log(data);
        const filteredData = data.filter((obj) => {
            console.log(obj, id);
            return obj.id !== id;
        });
        console.log(filteredData);
        setData(filteredData);
    };

    const handleUrlChange = (
        id: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newImageFields = data.map((field) => {
            if (field.id === id) {
                return { ...field, image: { uri: event.target.value } };
            }
            return field;
        });

        setData(newImageFields); // Update the parent component's data
    };

    const handleNameChange = (
        id: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newImageFields = data.map((field) => {
            if (field.id === id) {
                return { ...field, option: event.target.value };
            }
            return field;
        });

        setData(newImageFields); // Update the parent component's data
    };

    const saveToLocal = () => {
        localStorage.setItem("roulette-data", JSON.stringify(data));
    };

    const loadLocal = () => {
        const dataString = localStorage.getItem("roulette-data");
        if (dataString){

            const parsedData = JSON.parse(dataString);
            setData(parsedData);
        }
        else {
            alert("Nothing Saved")
        }
    };

    return (
        <div className={"form"}>
            {data.map((field, index) => (
                <div className={"option-section"}>
                    <div key={`name-${field.id}`} className="name-field">
                        <label htmlFor={`url-${field.id}`}>
                            Name {index + 1}:
                        </label>
                        <input
                            id={`name-${field.id}`}
                            value={field.option}
                            onChange={(event) =>
                                handleNameChange(field.id, event)
                            }
                        />
                    </div>
                    <div key={`url-${field.id}`} className="image-field">
                        <label htmlFor={`url-${field.id}`}>
                            Image URL {index + 1}:
                        </label>
                        <input
                            type="url"
                            id={`url-${field.id}`}
                            value={field?.image?.uri}
                            onChange={(event) =>
                                handleUrlChange(field.id, event)
                            }
                        />
                    </div>
                    {data.length > 1 && (
                        <button
                            type="button"
                            onClick={() => {
                                handleRemoveField(field.id);
                            }}
                        >
                            Remove Option
                        </button>
                    )}
                </div>
            ))}
            <button type="button" className={"add"} onClick={handleAddField}>
                Add Option
            </button>
            <div className={"memory-section"}>
                <button type="button" className={"add"} onClick={saveToLocal}>
                    Save current wheel
                </button>
                <button type="button" className={"add"} onClick={loadLocal}>
                    Load Saved wheel
                </button>
            </div>
        </div>
    );
}
