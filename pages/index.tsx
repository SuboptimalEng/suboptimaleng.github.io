import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faYoutube,
  faGithub,
  faTwitterSquare,
  faYoutubeSquare,
  faGithubSquare,
} from '@fortawesome/free-brands-svg-icons';
import { GA_TRACKING_ID } from '../lib/gtag';

export default function Home() {
  const socials = [
    {
      icon: faTwitter,
      href: 'https://www.twitter.com/SuboptimalEng',
      hoverClass: 'hover:text-twitter',
    },
    {
      icon: faYoutube,
      href: 'https://www.youtube.com/SuboptimalEng',
      hoverClass: 'hover:text-youtube',
    },
    {
      icon: faGithub,
      href: 'https://www.github.com/SuboptimalEng',
      hoverClass: 'hover:text-github',
    },
    // {
    //   icon: faTwitterSquare,
    //   href: 'https://www.twitter.com/SuboptimalEng',
    //   hoverClass: 'bg-twitter',
    // },
    // {
    //   icon: faYoutubeSquare,
    //   href: 'https://www.youtube.com/SuboptimalEng',
    //   hoverClass: 'bg-youtube',
    // },
    // {
    //   icon: faGithubSquare,
    //   href: 'https://www.github.com/SuboptimalEng',
    //   hoverClass: 'bg-github',
    // },
  ];

  return (
    <div>
      <Head>
        <title>Suboptimal Engineer</title>
        <meta
          property="og:image"
          content="https://suboptimaleng.vercel.app/channel_art.png"
        />
        <meta property="og:title" content="Suboptimal Engineer" />
        <meta
          property="description"
          // content="The typical blog of an atypical Indian guy who quit his tech job to become a YouTuber."
          // content="Just a typical Indian software engineer building products for creators and teaching web dev on YouTube."
          content="👨🏾‍💻 Indian software engineer + YouTuber building products to help creators."
        />
        <link rel="icon" href="/profile_pic.png" />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>

      <div className="min-h-screen bg-black text-white flex flex-col justify-center">
        <div className="flex space-x-4 md:space-x-8 justify-center">
          {socials.map((social, i) => {
            return (
              // Change text-color.
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10"
              >
                {/* {social.hoverClass === 'text-youtube' && (
                  <div className="absolute place-items-center bg-white inset-4 md:inset-8"></div>
                )} */}
                <FontAwesomeIcon
                  icon={social.icon}
                  className={'relative z-10 h-16 md:h-24 ' + social.hoverClass}
                ></FontAwesomeIcon>
              </a>

              // Change bg-color.
              // <div
              //   key={i}
              //   className={
              //     'relative flex h-12 md:h-20 place-items-center rounded-lg hover:' +
              //     social.hoverClass
              //   }
              // >
              //   <a href={social.href} target="_blank" className="relative z-10">
              //     <FontAwesomeIcon
              //       icon={social.icon}
              //       className="z-10 h-16 md:h-24"
              //     ></FontAwesomeIcon>
              //   </a>
              // </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
