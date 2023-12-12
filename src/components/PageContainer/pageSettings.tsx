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

export type ParallaxItemProps = {
  id: string;
  delta: number;
  className?: string;
  weight?: number;
};

export type PageSettingSvgItem = [
  React.FC<{ style: any }>,
  Partial<ParallaxItemProps>
];

export type PageSettingsSvgs = PageSettingSvgItem[];

export type PageSettings = {
  color: string;
  floatingColor?: string;
  total: number;
  svgs: PageSettingsSvgs;
};

export const pageSettings: Record<string, PageSettings> = {
  home: {
    color: "#160556, #5e0558",
    total: 3,
    svgs: [
      [
        SmallRect,
        { id: "home_sm_rect_1", className: "small-rect-home", weight: 5 },
      ],
      [
        SmallRect,
        { id: "home_sm_rect_2", className: "small-rect-home", weight: 20 },
      ],
      [
        SmallRect,
        { id: "home_sm_rect_3", className: "small-rect-home", weight: -6 },
      ],
      [
        SmallRect,
        { id: "home_sm_rect_4", className: "small-rect-home", weight: 20 },
      ],
      [SmallRect, { id: "home_sm_rect_5", className: "small-rect-home" }],
      [
        LargeRect,
        { id: "gradient_rect_lgg", className: "large-rect-home", weight: -5 },
      ],
      [
        LargeRect,
        {
          className: "large-rect-home",
          id: "gradient_rect_lgg_2",
          weight: 10,
        },
      ],
    ],
  },
  work: {
    floatingColor: "#16161C",
    color: "#0596D5, #00FF99",
    total: 3,
    svgs: [
      [WorkLargeRect, { id: "work_rect_lg_1", className: "work-rect-lg" }],
      [WorkLargeRect, { id: "work_rect_lg_2", className: "work-rect-lg" }],
      [WorkLargeRect, { id: "work_rect_lg_3", className: "work-rect-lg" }],
      [WorkSmallRect, { id: "work_rect_sm_1", className: "work-rect-sm" }],
      [WorkSmallRect, { id: "work_rect_sm_2", className: "work-rect-sm" }],
      [WorkSmallRect, { id: "work_rect_sm_3", className: "work-rect-sm" }],
      [WorkSmallRect, { id: "work_rect_sm_4", className: "work-rect-sm" }],
    ],
  },
  skills: {
    floatingColor: "#16161C",
    color: "#FF005F, #e5bf00",
    total: 2,
    svgs: [
      [
        SkillsLargeBlob,
        {
          id: "skill_blob_lg_1",
          className: "skill-blob-lg",
        },
      ],
      [
        SkillsLargeBlob,
        {
          id: "skill_blob_lg_2",
          className: "skill-blob-lg",
          weight: 12,
        },
      ],
      [
        SkillsLargeBlob,
        {
          id: "skill_blob_lg_3",
          className: "skill-blob-lg",
        },
      ],
      [
        SkillsLargeBlob,
        {
          id: "skill_blob_lg_4",
          className: "skill-blob-lg",
        },
      ],
      [
        SkillsSmallBlob,
        {
          id: "skill_blob_sm_1",
          className: "skill-blob-sm",
        },
      ],
      [
        SkillsSmallBlob,
        {
          id: "skill_blob_sm_2",
          className: "skill-blob-sm",
          weight: 8,
        },
      ],
      [
        SkillsSmallBlob,
        {
          id: "skill_blob_sm_3",
          className: "skill-blob-sm",
        },
      ],
      [
        SkillsSmallBlob,
        {
          id: "skill_blob_sm_4",
          className: "skill-blob-sm",
          weight: -8,
        },
      ],
      [
        SkillsSmallBlob,
        {
          id: "skill_blob_sm_5",
          className: "skill-blob-sm",
        },
      ],
      [
        SkillsSmallBlob,
        {
          id: "skill_blob_sm_8",
          className: "skill-blob-sm",
          weight: 50,
        },
      ],
      [
        SkillsSmallBlob,
        {
          id: "skill_blob_sm_9",
          className: "skill-blob-sm",
          weight: 10,
        },
      ],
    ],
  },
  resume: {
    color: "#0414EE, #08CAF2",
    total: 3,
    svgs: [
      [ResCircBtm, { className: "res-circ", id: "res_circ_btm" }],
      [ResCircTl, { className: "res-circ", id: "res_circ_tl" }],
      [ResCircMl, { className: "res-circ", id: "res_circ_ml" }],
      [ResCircTop, { className: "res-circ", id: "res_circ_top" }],
      [ResCircMd, { className: "res-circ", id: "res_circ_md" }],
    ],
  },
};

export default pageSettings;
