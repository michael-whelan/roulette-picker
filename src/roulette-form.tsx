import React from "react";

interface RouletteFormProps {
    data: PrizeData[];
    setData: (newData) => void;
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
        const newId = data.length;
        setData([...data, { id: newId, url: "" }]);
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

    return (
        <div>
            <form>
                {data.map((field) => (
                    <>
                        <div key={field.id} className="name-field">
                            <label htmlFor={`url-${field.id}`}>
                                Name: {field.id + 1}:
                            </label>
                            <input
                                id={`name-${field.id}`}
                                onChange={(event) =>
                                    handleNameChange(field.id, event)
                                }
                            />
                        </div>
                        <div key={field.id} className="image-field">
                            <label htmlFor={`url-${field.id}`}>
                                Image URL {field.id + 1}:
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
                    </>
                ))}
                <button type="button" onClick={handleAddField}>
                    Add Image
                </button>
            </form>
        </div>
    );
}
