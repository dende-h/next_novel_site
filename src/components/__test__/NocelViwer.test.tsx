import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NovelViewer } from "../NovelViwer";

describe("NovelViewer", () => {
	test("correctly renders text with ruby, link, and br tags", () => {
		const sampleText =
			"｜山田太郎《やまだたろう》さんと[|田中花子《たなかはなこ》](http://example.com)さんは、\n友達です。";

		render(<NovelViewer text={sampleText} />);

		// Check if ruby tag is rendered correctly
		const rubyElement = screen.getByText("山田太郎");
		expect(rubyElement).toBeInTheDocument();
		expect(rubyElement.closest("ruby")).toBeInTheDocument();
		expect(screen.getByText("やまだたろう")).toBeInTheDocument();

		// Check if link tag is rendered correctly
		const linkElements = screen.getAllByText("田中花子");
		const linkElement = linkElements.find((element) => element.textContent === "田中花子");
		expect(linkElement).toBeTruthy();
		expect(linkElement.closest("a")).toHaveAttribute("href", "http://example.com");

		// Check if br tag is rendered correctly
		expect(screen.getByText(/友達です。/)).toBeInTheDocument();
	});
});
