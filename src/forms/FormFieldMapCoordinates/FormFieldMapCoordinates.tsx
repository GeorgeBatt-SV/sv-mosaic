import * as React from "react";
import {
	memo,
	ReactElement,
	useState,
	useMemo
} from "react";
import {
	MapCoordinatesData,
	MapCoordinatesInputSettings,
} from "./MapCoordinatesTypes";
import { MosaicFieldProps } from "@root/components/Field";

// External libraries
import { useLoadScript } from "@react-google-maps/api";

// Components
import Button from "@root/components/Button";
import MapCoordinatesDrawer from "./MapCoordinatesDrawer";

// Styles
import {
	ButtonsWrapper,
	Column,
	CoordinatesCard,
	CoordinatesValues,
	LatitudeValue,
	LatLngLabel,
	MapImageColumn,
} from "./MapCoordinates.styled";

// Utils
import {
	isValidLatLng,
	libraries,
} from "./MapCoordinatesUtils";
import Drawer from "@root/components/Drawer";
import Blank from "@root/components/Blank/Blank";

const FormFieldMapCoordinates = (props: MosaicFieldProps<"mapCoordinates", MapCoordinatesInputSettings, MapCoordinatesData>): ReactElement => {
	const {
		value,
		onBlur,
		onChange,
		fieldDef,
	} = props;

	const latLng = useMemo(() => isValidLatLng(value) ? value : undefined, [value]);

	// Supports legacy mapPosition
	const initialCenter = fieldDef?.inputSettings?.initialCenter || fieldDef?.inputSettings?.mapPosition;

	// State variables
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [hasUnsavedChanges, setUnsavedChanges] = useState(false);
	const [dialogOpen, setIsDialogOpen] = useState(false);

	/**
	 * Opens the modal that displays the map.
	 */
	const handleAddCoordinates = () => {
		setIsModalOpen(true);
	};

	/**
	 * Closes the modal.
	 */
	const handleClose = async (save = false) => {
		if (typeof save === "boolean" && save) {
			setUnsavedChanges(false);
			setIsModalOpen(false);
			if (onBlur) await onBlur();
		} else if (hasUnsavedChanges)
			setIsDialogOpen(true);
		else {
			setUnsavedChanges(false);
			setIsModalOpen(false);
			if (onBlur) await onBlur();
		}
	};

	const handleDialogClose = async (close: boolean) => {
		if (close) {
			await handleClose(true);
		}
		setIsDialogOpen(false);
	}

	/**
	 * Clear values for the entered location.
	 */
	const removeLocation = () => {
		onChange && onChange(undefined);
	};

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: fieldDef?.inputSettings?.googleMapsApiKey,
		libraries,
	});

	if (loadError) return <span>{"Error loading maps"}</span>;
	if (!isLoaded) return <span>{"Loading Maps"}</span>;

	return (
		<>
			{latLng ? (
				<div>
					<CoordinatesCard>
						<MapImageColumn>
							{latLng ? (
								<img
									src={`https://maps.googleapis.com/maps/api/staticmap?zoom=12&size=232x153&maptype=roadmap&markers=color:red%7C${latLng?.lat},${latLng?.lng}&key=${fieldDef.inputSettings.googleMapsApiKey}`}
									alt="location"
								/>
							) : (
								<Blank />
							)}
						</MapImageColumn>
						<Column>
							<LatLngLabel>Latitude</LatLngLabel>
							{latLng ? (
								<LatitudeValue>{latLng?.lat}</LatitudeValue>
							) : (
								<Blank />
							)}
							<LatLngLabel>Longitude</LatLngLabel>
							{latLng ? (
								<CoordinatesValues>{latLng?.lng}</CoordinatesValues>
							) : (
								<Blank />
							)}
						</Column>
						{!fieldDef.disabled && (
							<ButtonsWrapper>
								<Button
									color="teal"
									variant="text"
									label="Edit"
									disabled={fieldDef?.disabled}
									onClick={handleAddCoordinates}
								/>
								<Button
									color="red"
									disabled={fieldDef?.disabled}
									variant="text"
									label="Remove"
									onClick={removeLocation}
								/>
							</ButtonsWrapper>
						)}
					</CoordinatesCard>
				</div>
			) : (
				<Button
					disabled={fieldDef?.disabled}
					onClick={handleAddCoordinates}
					color="gray"
					variant="outlined"
					label="ADD COORDINATES"
				></Button>
			)}

			<Drawer open={isModalOpen} onClose={handleClose}>
				<MapCoordinatesDrawer
					value={value}
					fieldDef={fieldDef}
					onChange={onChange}
					handleClose={handleClose}
					handleUnsavedChanges={(e) => setUnsavedChanges(e)}
					dialogOpen={dialogOpen}
					handleDialogClose={handleDialogClose}
					initialCenter={initialCenter}
				/>
			</Drawer>
		</>
	);
};

export default memo(FormFieldMapCoordinates);
