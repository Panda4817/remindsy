import React from "react";
import {
	StyleSheet,
	View,
	ActivityIndicator,
} from "react-native";
import { Formik, FormikValues } from "formik";
import * as Notifications from "expo-notifications";
import * as Yup from "yup";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import CustomPicker from "../UI/Picker";
import Input from "../UI/Input";
import CustomSwitch from "../UI/Switch";
import colours from "../../constants/Colours";
import { months } from "../../helpers/formatting";
import { regular } from "../../constants/Fonts";
import CustomButton from "../UI/CustomButton";
import CustomText from "../UI/CustomText";

export const formSchema = Yup.object().shape({
	type: Yup.string()
		.default("Birthday")
		.required("Remindsy type is required"),
	day: Yup.number()
		.min(1, "Day should be between 1 and 31")
		.max(31, "Day should be between 1 and 31")
		.default(new Date().getDate())
		.required(),
	month: Yup.number()
		.min(0, "Month should be between January and December")
		.max(11, "Month should be between January and December")
		.default(new Date().getMonth())
		.required(),
	firstName: Yup.string()
		.default("")
		.required("A name is required"),
	secondName: Yup.string()
		.default("No name provided")
		.required(),
	startYear: Yup.number()
		.min(0, "The year has to be a positive number")
		.default(0)
		.required(),
	present: Yup.bool().default(false).required(),
	ideas: Yup.string()
		.default("No present ideas provided")
		.required(),
	address: Yup.string()
		.default("No address provided")
		.required(),
	pushNotification: Yup.bool().default(true).required(),
	noticeTime: Yup.number()
		.min(
			1,
			"Pick between being notified 1 week before or 2 weeks before"
		)
		.max(
			2,
			"Pick between being notified 1 week before or 2 weeks before"
		)
		.default(1)
		.required(),
});

const FormikForm = (props: any) => {
	let buttonText = "Save new Remindsy";
	if (props.selectedEvent) {
		buttonText = "Save changes";
	}
	const getValues = () => {
		if (props.selectedEvent) {
			return {
				type: props.selectedEvent.type,
				firstName: props.selectedEvent.firstName,
				secondName: props.selectedEvent.secondName,
				day: props.selectedEvent.day,
				month: props.selectedEvent.month,
				startYear: props.selectedEvent.startYear,
				noticeTime: props.selectedEvent.noticeTime,
				present: props.selectedEvent.present,
				ideas: props.selectedEvent.ideas,
				address: props.selectedEvent.address,
				pushNotification:
					props.selectedEvent.pushNotification,
			};
		} else if (
			props.route.params.filterDay &&
			props.route.params.filterMonth
		) {
			return {
				type: "Birthday",
				firstName: "",
				secondName: "",
				day: props.route.params.filterDay,
				month: props.route.params.filterMonth - 1,
				startYear: 0,
				noticeTime: 1,
				present: false,
				ideas: "",
				address: "",
				pushNotification: true,
			};
		} else {
			return {
				type: "Birthday",
				firstName: "",
				secondName: "",
				day: new Date().getDate(),
				month: new Date().getMonth(),
				startYear: 0,
				noticeTime: 1,
				present: false,
				ideas: "",
				address: "",
				pushNotification: true,
			};
		}
	};

	return (
		<Formik
			initialValues={getValues()}
			validationSchema={formSchema}
			onSubmit={async (values: FormikValues) => {
				for (const key in values) {
					if (values[key] === "") {
						values[key] = formSchema.getDefault()[key];
					}
				}
				values.startYear = parseInt(values.startYear);
				values.present = values.present == 1 ? true : false;
				values.pushNotification =
					values.pushNotification == 1 ? true : false;
				if (values.pushNotification === true) {
					const statusObj =
						await Notifications.getPermissionsAsync();
					if (statusObj.status !== "granted") {
						const statusObj =
							await Notifications.requestPermissionsAsync();
					}
				}
				props.submitHandler(values);
			}}
		>
			{({
				handleChange,
				handleBlur,
				handleSubmit,
				values,
				touched,
				errors,
				isSubmitting,
				setFieldValue,
			}) => {
				return (
					<>
						<View style={styles.form}>
							<CustomPicker
								value={values.type}
								onValueChangeHandler={(itemValue: any) =>
									setFieldValue("type", itemValue)
								}
								label="Remindsy type"
								items={[
									{ label: "Other", value: "Other" },
									{
										label: "Wedding Anniversary",
										value: "Wedding Anniversary",
									},
									{
										label: "Birthday",
										value: "Birthday",
									},
								]}
								error={errors.type}
								touched={touched.type}
								testID="typePicker"
							/>
							<CustomPicker
								value={values.day}
								onValueChangeHandler={(itemValue: any) =>
									setFieldValue("day", itemValue)
								}
								label="Day"
								items={Array(31)
									.fill(0)
									.map((val: number, index: number) => {
										return {
											label: `${index + 1}`,
											value: index + 1,
										};
									})}
								error={errors.day}
								touched={touched.day}
								testID="dayPicker"
							/>
							<CustomPicker
								value={values.month}
								onValueChangeHandler={(itemValue: any) =>
									setFieldValue("month", itemValue)
								}
								label="Month"
								items={Array(12)
									.fill(0)
									.map((val: string, index: number) => {
										return {
											label: months[index],
											value: index,
										};
									})}
								error={errors.month}
								touched={touched.month}
								testID="monthPicker"
							/>
							<Input
								onChangeText={handleChange("firstName")}
								onBlur={handleBlur("firstName")}
								value={values.firstName}
								label="Name"
								error={errors.firstName}
								touched={touched.firstName}
								testID="firstNameInput"
							/>
							{values.type == "Wedding Anniversary" ? (
								<Input
									onChangeText={handleChange("secondName")}
									onBlur={handleBlur("secondName")}
									value={values.secondName}
									label="Second Name"
									error={errors.secondName}
									touched={touched.secondName}
									placeholder="No name provided"
									testID="secondNameInput"
								/>
							) : null}
							<Input
								onChangeText={(itemValue: string) => {
									if (
										/^\d+$/.test(itemValue) ||
										itemValue === ""
									) {
										setFieldValue("startYear", itemValue);
									}
								}}
								onBlur={handleBlur("startYear")}
								value={values.startYear.toString()}
								label={
									values.type == "Birthday"
										? "Year of birth"
										: values.type == "Wedding Anniversary"
										? "Wedding year"
										: "Start year"
								}
								keyboardType="numeric"
								error={errors.startYear}
								touched={touched.startYear}
								testID="yearInput"
							/>
							<CustomSwitch
								value={values.present}
								label={
									values.present
										? "Change to card only?"
										: "Add present too?"
								}
								extraLabel={
									values.present
										? "Card and present reminder selected"
										: "Card only reminder selected"
								}
								onValueChangeHandler={(
									itemValue: Boolean
								) => setFieldValue("present", itemValue)}
								error={errors.present}
								touched={touched.present}
								testID="presentSwitch"
							/>
							{values.present ? (
								<Input
									onChangeText={handleChange("ideas")}
									onBlur={handleBlur("ideas")}
									value={values.ideas}
									label="Present ideas"
									multiline={true}
									error={errors.ideas}
									touched={touched.ideas}
									placeholder="No present ideas provided"
									testID="ideasInput"
								/>
							) : null}
							{
								// Add a way to retrieve address from contacts
								// button
								// expo-contacts
								// get permission
								// search by name
								// show results in a modal
								// pick a result and fills in input with address, back to form
							}
							<Input
								onChangeText={handleChange("address")}
								onBlur={handleBlur("address")}
								value={values.address}
								label="Address"
								multiline={true}
								error={errors.address}
								touched={touched.address}
								placeholder="No address provided"
								testID="addressInput"
							/>
							<CustomSwitch
								value={values.pushNotification}
								label="Enable notifications"
								onValueChangeHandler={(
									itemValue: Boolean
								) =>
									setFieldValue(
										"pushNotification",
										itemValue
									)
								}
								error={errors.pushNotification}
								touched={touched.pushNotification}
								testID="notificationSwitch"
							/>
							{values.pushNotification ? (
								<CustomPicker
									value={values.noticeTime}
									onValueChangeHandler={(itemValue: any) =>
										setFieldValue("noticeTime", itemValue)
									}
									label="Notification time"
									items={[
										{
											label: "1 week before",
											value: 1,
										},
										{
											label: "2 weeks before",
											value: 2,
										},
									]}
									error={errors.noticeTime}
									touched={touched.noticeTime}
									testID="noticePicker"
								/>
							) : null}
							{isSubmitting || props.isLoading ? (
								<ActivityIndicator
									size="large"
									color={colours.darkPink}
								/>
							) : (
								<CustomButton
									onPress={() => {
										handleSubmit();
									}}
									style={{
										backgroundColor: colours.darkPink,
										marginHorizontal: 50,
									}}
									testID="submitButton"
								>
									<FontAwesome5
										name="save"
										size={18}
										color="white"
									/>
									<CustomText
										style={{
											...styles.buttonText,
											color: "white",
										}}
									>
										{buttonText}
									</CustomText>
								</CustomButton>
							)}
						</View>
					</>
				);
			}}
		</Formik>
	);
};

export default FormikForm;

const styles = StyleSheet.create({
	form: {
		margin: 20,
	},
	picker: {
		margin: 0,
		padding: 0,
		fontFamily: regular,
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontSize: 18,
		marginVertical: 10,
	},
});
