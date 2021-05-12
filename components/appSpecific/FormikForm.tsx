import React from "react";
import {
	StyleSheet,
	View,
	Button,
	ActivityIndicator,
} from "react-native";
import { Formik, FormikValues } from "formik";
import * as Yup from "yup";
import CustomPicker from "../UI/Picker";
import Input from "../UI/Input";
import CustomSwitch from "../UI/Switch";
import colours from "../../constants/Colours";
import { months } from "../../helpers/format";

const formSchema = Yup.object().shape({
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
	let buttonText = "Create Remindsy";
	if (props.selectedEvent) {
		buttonText = "Edit Remindsy";
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
					if (values[key] == "") {
						values[key] = formSchema.getDefault()[key];
					}
					if (key == "startYear") {
						values.startYear = parseInt(values.startYear);
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
							/>
							<Input
								onChangeText={handleChange("firstName")}
								onBlur={handleBlur("firstName")}
								value={values.firstName}
								label="Name"
								error={errors.firstName}
								touched={touched.firstName}
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
										? "Card and present reminder"
										: "Card only reminder"
								}
								onValueChangeHandler={(
									itemValue: Boolean
								) => setFieldValue("present", itemValue)}
								error={errors.present}
								touched={touched.present}
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
								/>
							) : null}
							<Input
								onChangeText={handleChange("address")}
								onBlur={handleBlur("address")}
								value={values.address}
								label="Address"
								multiline={true}
								error={errors.address}
								touched={touched.address}
								placeholder="No address provided"
							/>
							<CustomSwitch
								value={values.pushNotification}
								label={
									values.pushNotification
										? "Disable notification"
										: "Enable notification"
								}
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
								/>
							) : null}
							{isSubmitting || props.isLoading ? (
								<ActivityIndicator
									size="large"
									color={colours.darkPink}
								/>
							) : (
								<Button
									onPress={() => handleSubmit()}
									title={buttonText}
									color={colours.darkPink}
								/>
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
		fontFamily: "open-sans",
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});