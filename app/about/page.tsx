export default function AboutPage() {
	return (
		<main className="prose prose-invert mx-auto py-10 px-4 max-w-3xl">
			<h1>About Me</h1>
			<p>Hi! I&apos;m Evan, a Computing Engineering Student at The University of British Columbia. I love hiking, photography, and all things tech!</p>
			<div className="flex flex-col items-center">
				<img src="/images/hiking.JPEG" alt="Backpacking Twin Falls, Whaleback, and Iceline Loop in 2023" className="!m-1" width={500} />
				<div className="text-center text-sm italic">Backpacking Twin Falls, Whaleback, and Iceline Loop in 2023</div>
			</div>
			<p>I started programming at a young age, and found a passion for web development during high school. Since then I&apos;ve been continuously learning and building a variety of projects. These range from for profit businesses, to small community group sites.</p>
			<p>I've worked with many different people and teams, and have grown a passion for small teams and startups, especially around other students who share similar passions. I've found that these teams can consistently deliver high quality work and always strive to do imrprove, which is the same environment that I thrive in.</p>
			<div className="flex flex-col items-center">
				<img src="/images/photography.jpg" alt="Sunset at Wreck Beach" className="!m-1" width={500} />
				<div className="text-center text-sm italic">Taking photos of the sunset at Wreck Beach</div>
			</div>
			<p>When I'm not working at my desk, you can always find me outdoors, whether I'm on a run, a weekend backpack trip, or just taking photos of the view. I've always loved going outside, and I find that it helps me find balance between work and life.</p>
			<p>I'm always looking for new opportunities, so if you've got a project in mind, or just want to connect, please feel free to reach out! I'd love to chat with you!</p>
			<p>See you around!</p>
		</main>
	)
}