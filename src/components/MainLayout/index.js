import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { useEffect } from 'react';
import { Lenis as ReactLenis } from '@studio-freight/react-lenis'
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';


export default function MainLayout({ children }) {

  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const showAnim = gsap.from('.navbar', {
      yPercent: -100,
      paused: true,
      duration: 0.2
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        let element = document.querySelector('.navbar');
        if (element) {
          if (self.direction === 1) {
            element.classList.add("my-class");
          }
          if (self.direction === -1) {
            element.classList.add("up");
          }
          if (self.progress === 0) {
            element.classList.remove("up");
            element.classList.remove("my-class");
          }
        }
        self.direction === -1 ? showAnim.play() : showAnim.reverse()
      }
    });

  })

  return (
    <ReactLenis root>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="Our solutions make familiarization possible for both own and hired equipment, and provide a collected overview of documented and certified competence."
        className={"main-header"}>
        <main>
          {children}
        </main>
      </Layout>
    </ReactLenis>
  );
}
