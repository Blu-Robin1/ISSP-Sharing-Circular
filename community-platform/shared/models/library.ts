import type { DBAuthor } from './author';
import { Author } from './author';
import type { DBCategory } from './category';
import { Category } from './category';
import type { IConvertedFileMeta } from './common';
import type { IContentDoc, IDBContentDoc } from './content';
import type { IDBDownloadable, IDownloadable } from './document';
import type { IFilesForm } from './filesForm';
import type { IImageForm } from './imageForm';
import type { DBMedia, IMediaFile, Image } from './media';
import type { IDBModeration, IModeration, Moderation } from './moderation';
import type { SelectValue } from './other';
import type { Tag } from './tag';

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'very-hard';
export const DifficultyLevelRecord: Record<DifficultyLevel, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  'very-hard': 'Very Hard',
};

export class DBProject implements IDBContentDoc, IDBDownloadable, IDBModeration {
  readonly id: number;
  readonly created_at: Date;
  readonly deleted: boolean | null;
  readonly author?: DBAuthor;
  readonly update_count?: number;
  readonly useful_count?: number;
  readonly useful_votes_last_week?: number;
  readonly subscriber_count?: number;
  readonly comment_count?: number;
  readonly total_views?: number;
  readonly category: DBCategory | null;
  readonly steps: DBProjectStep[] | null;
  created_by: number | null;
  modified_at: Date | null;
  title: string;
  slug: string;
  previous_slugs: string[] | null;
  description: string;
  difficulty_level: DifficultyLevel;
  cover_image: DBMedia | null;
  file_link: string | null;
  files: IMediaFile[] | null;
  category_id?: number;
  tags: number[];
  is_draft: boolean | null;
  time?: string;
  file_download_count?: number;
  moderation: Moderation;
  moderation_feedback: string;
  lat?: number;
  lng?: number;
  stage?: number;
  stage_override?: number | null;
  supporter_count?: number;
  member_count?: number;
  champion_count?: number;
  volunteer_count?: number;
  donate_count?: number;

  constructor(obj: Omit<DBProject, 'id'>) {
    Object.assign(this, obj);
  }
}

export class Project implements IContentDoc, IDownloadable, IModeration {
  id: number;
  createdAt: Date;
  author: Author | null;
  modifiedAt: Date | null;
  title: string;
  slug: string;
  previousSlugs: string[];
  description: string;
  coverImage: Image | null;
  deleted: boolean;
  category: Category | null;
  totalViews: number;
  files: IMediaFile[] | null;
  hasFileLink: boolean;
  tags: Tag[];
  tagIds?: number[];
  difficultyLevel: DifficultyLevel;
  steps: ProjectStep[];
  isDraft: boolean;
  usefulCount: number;
  usefulVotesLastWeek?: number;
  subscriberCount: number;
  commentCount: number;
  fileDownloadCount: number;
  moderation: Moderation;
  moderationFeedback?: string;
  time?: string;
  lat?: number;
  lng?: number;
  stage?: number;
  stageOverride?: number | null;
  supporterCount?: number;
  memberCount?: number;
  championCount?: number;
  volunteerCount?: number;
  donateCount?: number;

  constructor(obj: Project) {
    Object.assign(this, obj);
  }

  static fromDB(obj: DBProject, tags: Tag[], images: Image[] = []) {
    const steps = obj.steps?.map((update) => ProjectStep.fromDB(update, images)) || [];

    return new Project({
      id: obj.id,
      createdAt: new Date(obj.created_at),
      author: obj.author ? Author.fromDB(obj.author) : null,
      modifiedAt: obj.modified_at ? new Date(obj.modified_at) : null,
      title: obj.title,
      slug: obj.slug,
      previousSlugs: obj.previous_slugs || [],
      description: obj.description,
      coverImage: images?.find((x) => x.id === obj.cover_image?.id) || null,
      deleted: obj.deleted || false,
      category: obj.category ? Category.fromDB(obj.category) : null,
      totalViews: obj.total_views || 0,
      tagIds: obj.tags?.map((x) => Number(x)),
      tags: tags,
      difficultyLevel: obj.difficulty_level,
      subscriberCount: obj.subscriber_count || 0,
      commentCount: obj.comment_count || 0,
      usefulCount: obj.useful_count || 0,
      usefulVotesLastWeek: obj.useful_votes_last_week || 0,
      isDraft: obj.is_draft || false,
      fileDownloadCount: obj.file_download_count || 0,
      files: obj.files,
      moderation: obj.moderation,
      moderationFeedback: obj.moderation_feedback,
      // no fileLink as it must be shown only for authenticated users
      hasFileLink: !!obj.file_link,
      time: obj.time,
      lat: obj.lat !== undefined && obj.lat !== null ? Number(obj.lat) : undefined,
      lng: obj.lng !== undefined && obj.lng !== null ? Number(obj.lng) : undefined,
      stage: obj.stage,
      stageOverride: obj.stage_override,
      supporterCount: obj.supporter_count,
      memberCount: obj.member_count,
      championCount: obj.champion_count,
      volunteerCount: obj.volunteer_count,
      donateCount: obj.donate_count,
      steps,
    });
  }
}

export class DBProjectStep {
  readonly id: number;
  readonly project_id: number;
  title: string;
  description: string;
  images: DBMedia[] | null;
  video_url: string | null;
  order: number;
  stage?: number;

  constructor(obj: Omit<DBProjectStep, 'id'>) {
    Object.assign(this, obj);
  }
}

export class ProjectStep {
  id: number;
  projectId: number;
  title: string;
  description: string;
  images: Image[] | null;
  videoUrl: string | null;
  order: number;

  constructor(obj: ProjectStep) {
    Object.assign(this, obj);
  }

  static fromDB(obj: DBProjectStep, images?: Image[]) {
    return new ProjectStep({
      id: obj.id,
      projectId: obj.project_id,
      title: obj.title,
      description: obj.description,
      images: images?.filter((x) => obj.images?.map((x) => x.id)?.includes(x.id)) || [],
      videoUrl: obj.video_url,
      order: obj.order ?? obj.stage ?? 0,
    });
  }
}

export interface ProjectFormData extends IFilesForm, IImageForm {
  title: string;
  description: string;
  category?: SelectValue;
  tags?: number[];
  difficultyLevel?: DifficultyLevel;
  time?: string;
  lat?: number;
  lng?: number;
  steps: ProjectStepFormData[];
}

export type ProjectStepFormData = {
  id?: number;
  title: string;
  description: string;
  images?: IConvertedFileMeta[];
  existingImages?: Image[] | null;
  videoUrl?: string;
};
