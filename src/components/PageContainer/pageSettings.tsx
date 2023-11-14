import React from "react";
import { ReactComponent as LargeRect } from "../../assets/rect-lg.svg";
import { ReactComponent as SmallRect } from "../../assets/rect-sm.svg";
import { ReactComponent as WorkLargeRect } from "../../assets/work-rect-lg.svg";
import { ReactComponent as WorkSmallRect } from "../../assets/work-rect-sm.svg";
import { ReactComponent as SkillsLargeBlob } from "../../assets/skill-blob-lg.svg";
import { ReactComponent as SkillsSmallBlob } from "../../assets/skill-blob-sm.svg";
import { ReactComponent as ResCircBtm } from "../../assets/res-circ-bottom.svg";
import { ReactComponent as ResCircTl } from "../../assets/res-circ-tl.svg";
import { ReactComponent as ResCircMl } from "../../assets/res-circ-ml.svg";
import { ReactComponent as ResCircTop } from "../../assets/res-circ-top.svg";
import { ReactComponent as ResCircMd } from "../../assets/res-circ-md.svg";

export type PageSettings = {
  color: string;
  floatingColor?: string;
  total: number;
  svgs: JSX.Element;
};

export const pageSettings: Record<string, PageSettings> = {
  home: {
    color: "#160556, #5e0558",
    total: 3,
    svgs: (
      <>
        <SmallRect key="tl1" id="home_sm_rect_1" className="small-rect-home" />
        <SmallRect key="tl2" id="home_sm_rect_2" className="small-rect-home" />
        <SmallRect key="l1" id="home_sm_rect_3" className="small-rect-home" />
        <SmallRect key="bl1" id="home_sm_rect_4" className="small-rect-home" />
        <SmallRect key="bl2" id="home_sm_rect_5" className="small-rect-home" />
        <LargeRect key="br1" className="large-rect-home" />
        <LargeRect
          key="br2"
          className="large-rect-home"
          id="gradient_rect_lg_2"
        />
      </>
    ),
  },
  work: {
    floatingColor: "#16161C",
    color: "#0596D5, #00FF99",
    total: 3,
    svgs: (
      <>
        <WorkLargeRect key="bl1" id="work_rect_lg_1" className="work-rect-lg" />
        <WorkLargeRect key="bl2" id="work_rect_lg_2" className="work-rect-lg" />
        <WorkLargeRect key="br2" id="work_rect_lg_3" className="work-rect-lg" />
        <WorkSmallRect key="tl1" id="work_rect_sm_1" className="work-rect-sm" />
        <WorkSmallRect key="tl2" id="work_rect_sm_2" className="work-rect-sm" />
        <WorkSmallRect key="tl3" id="work_rect_sm_3" className="work-rect-sm" />
        <WorkSmallRect key="tl4" id="work_rect_sm_4" className="work-rect-sm" />
      </>
    ),
  },
  skills: {
    floatingColor: "#16161C",
    color: "#FF005F, #e5bf00",
    total: 2,
    svgs: (
      <>
        <SkillsLargeBlob
          key="lg1"
          id="skill_blob_lg_1"
          className="skill-blob-lg"
        />
        <SkillsLargeBlob
          key="lg2"
          id="skill_blob_lg_2"
          className="skill-blob-lg"
        />
        <SkillsLargeBlob
          key="lg3"
          id="skill_blob_lg_3"
          className="skill-blob-lg"
        />
        <SkillsLargeBlob
          key="lg4"
          id="skill_blob_lg_4"
          className="skill-blob-lg"
        />
        <SkillsSmallBlob
          key="sm1"
          id="skill_blob_sm_1"
          className="skill-blob-sm"
        />
        <SkillsSmallBlob
          key="sm2"
          id="skill_blob_sm_2"
          className="skill-blob-sm"
        />
        <SkillsSmallBlob
          key="sm3"
          id="skill_blob_sm_3"
          className="skill-blob-sm"
        />
        <SkillsSmallBlob
          key="sm4"
          id="skill_blob_sm_4"
          className="skill-blob-sm"
        />
        <SkillsSmallBlob
          key="sm5"
          id="skill_blob_sm_5"
          className="skill-blob-sm"
        />
        <SkillsSmallBlob
          key="sm8"
          id="skill_blob_sm_8"
          className="skill-blob-sm"
        />
        <SkillsSmallBlob
          key="sm9"
          id="skill_blob_sm_9"
          className="skill-blob-sm"
        />
      </>
    ),
  },
  resume: {
    color: "#0414EE, #08CAF2",
    total: 3,
    svgs: (
      <>
        <ResCircBtm className="res-circ" id="res_circ_btm" />
        <ResCircTl className="res-circ" id="res_circ_tl" />
        <ResCircMl className="res-circ" id="res_circ_ml" />
        <ResCircTop className="res-circ" id="res_circ_top" />
        <ResCircMd className="res-circ" id="res_circ_md" />
      </>
    ),
  },
};

export default pageSettings;
