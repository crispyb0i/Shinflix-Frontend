import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export const JournalPage = () => {
	const [watchDate, setWatchDate] = useState(null);
	const [inputs, setInputs] = useState({});
	const [movie, setMovie] = useState(null);

	const handleChange = (event) => {
		setInputs({
			...inputs,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleDateSelect = (date) => {
		const currentDate = new Date().setHours(0, 0, 0, 0); // Set current date without time
		const selectedDate = new Date(date).setHours(0, 0, 0, 0); // Set selected date without time

		if (selectedDate > currentDate) {
			// Date is in the future, don't update the state
			return;
		}

		let currentInputs = inputs;

		setInputs({ ...currentInputs, date });
		setWatchDate(date);
	};

	const isDayDisabled = (day) => {
		return day > new Date();
	};

	let footer = <p className="mt-5">Please pick a day.</p>;
	if (watchDate) {
		footer = <p className="mt-5">Watched on {format(watchDate, "PP")}.</p>;
	}

	return (
		<form
			className={"flex items-center justify-center"}
			onSubmit={handleSubmit}
		>
			<div className="my-28">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 font-2xl text-gray-900">
						Journal
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Create a journal entry
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<label
								htmlFor="media_title"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Add Media By Title
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
									<input
										type="text"
										name="media_title"
										id="media_title"
										autoComplete="media_title"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										onChange={handleChange}
									/>
								</div>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="blurb"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Blurb
							</label>
							<div className="mt-2">
								<textarea
									id="blurb"
									name="blurb"
									rows="3"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									onChange={handleChange}
									autoComplete={"off"}
								/>
							</div>
							<p className="mt-3 text-sm leading-6 text-gray-600">
								Write your own personal review or any thoughts or feelings you
								had about it
							</p>
						</div>
						<div className="sm:col-span-3">
							<label
								htmlFor="rating"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Rating
							</label>
							<div className="mt-2">
								<select
									id="rating"
									name="rating"
									autoComplete="rating-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
									onChange={handleChange}
								>
									<option></option>
									<option>⭐</option>
									<option>⭐⭐</option>
									<option>⭐⭐⭐</option>
									<option>⭐⭐⭐⭐</option>
									<option>⭐⭐⭐⭐⭐</option>
								</select>
							</div>
							<div className="mt-20">
								<h1 className="text-base font-semibold leading-7 text-gray-900">
									Date watched:
								</h1>
								<DayPicker
									mode="single"
									selected={watchDate}
									onSelect={handleDateSelect}
									captionLayout="dropdown"
									fromYear={2000}
									toYear={new Date().getFullYear()}
									showOutsideDays
									disabled={isDayDisabled}
									modifiersStyles={{
										disabled: { color: "fff" },
									}}
									footer={footer}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="button"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Save
					</button>
				</div>
			</div>
		</form>
	);
};

// Format dates like this when adding to Firebase
// const date = new Date(); // The date you want to store
// const timestamp = firebase.firestore.Timestamp.fromDate(date);

// Timestamp(seconds, nanoseconds)
// Timestamp(1656748920, 123000000)

// The seconds part represents the number of seconds since the Unix epoch
// (January 1, 1970, 00:00:00 UTC), and the nanoseconds part represents
// the additional fractional seconds.

// Please note that the actual values in the console log may vary
// depending on the specific timestamp and your timezone.

// when rendering, use whiteSpace: "pre-wrap" to maintain spacing and formatting.
// <p style={{ whiteSpace: "pre-wrap" }}>{inputs.blurb}</p>
