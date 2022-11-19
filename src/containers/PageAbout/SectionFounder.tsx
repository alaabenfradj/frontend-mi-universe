import Heading from "components/Heading/Heading";
import NcImage from "components/NcImage/NcImage";
import React from "react";

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string;
}

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Alaa Ben Fradj`,
    job: "Co-founder and Chief Executive",
    avatar:
      "https://scontent.ftun18-1.fna.fbcdn.net/v/t1.6435-9/157922933_3500268416745988_6946512177276557800_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=WstW-khzl-cAX-fbyOD&_nc_ht=scontent.ftun18-1.fna&oh=00_AT__n_LotXivlsTBYAJtWFD5v2P_R_gpQJT-jSWolyQfPA&oe=626C8F6F",
  },
  {
    id: "4",
    name: `Jasser Chaieb`,
    job: "Co-founder and Chief Executive",
    avatar:
      "https://scontent.ftun18-1.fna.fbcdn.net/v/t39.30808-6/277121967_4953264094768447_5687061202882065890_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=jZC7A6M5UMgAX-WjDsq&_nc_ht=scontent.ftun18-1.fna&oh=00_AT9G9L4jvoogOic50sPAf-sdHUH5LFWIySQVNaJJVyAB-Q&oe=624B7B0A",
  },
  {
    id: "3",
    name: `Fakher Hasnaoui`,
    job: "Co-founder, Chairman",
    avatar:
      "https://scontent.ftun18-1.fna.fbcdn.net/v/t1.6435-9/110080857_3360028920714325_6214673110984339042_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=TadmQwPWQOoAX8AIREL&_nc_ht=scontent.ftun18-1.fna&oh=00_AT_W4-CgXhVr-RrhskYcVqItBB47wJW1z8bfFg0X07GAWg&oe=626BB55C",
  },
  {
    id: "2",
    name: `Mohammed Oussema Braiek`,
    job: "Co-Founder, Chief Strategy Officer",
    avatar:
      "https://scontent.ftun18-1.fna.fbcdn.net/v/t1.6435-9/116437937_1742088782598757_2331147029245238921_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=FfMc65vukn0AX_0hIZZ&_nc_ht=scontent.ftun18-1.fna&oh=00_AT_jKnheVAFCunDZ9-Q7OikSqqfz7sE5iZyWnFvtKNgTTA&oe=626B0CB9",
  },
  {
    id: "5",
    name: `Tayeb Gasmi`,
    job: "Co-Founder, Chief Strategy Officer",
    avatar:
      "https://scontent.ftun18-1.fna.fbcdn.net/v/t1.6435-9/61500475_2222520311298629_8102480134893731840_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=174925&_nc_ohc=afZSMz0CHK8AX_XT4UI&_nc_ht=scontent.ftun18-1.fna&oh=00_AT-yX2EDAuNE9NH8-OhYiQJpKVxXtvNWZR8AOL7G6-NxFw&oe=626AD845",
  },
];

const SectionFounder = () => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading
        
      >
        ⛱ Founders
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-5 xl:gap-x-8">
        {FOUNDER_DEMO.map((item) => (
          <div key={item.id} className="max-w-sm">
            <NcImage
              containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
              className="absolute inset-0 object-cover"
              src={item.avatar}
            />
            <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
              {item.name}
            </h3>
            {/* <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.job}
            </span> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFounder;
