enum ItemType {
    head = 'head',
    body = 'body',
    lefthand = 'lefthand',
    righthand = 'righthand',
    leg = 'leg',
    full = 'full',
}

enum AvatarType {
    story = 'story',
    store = 'store',
}

enum EntityEnum {}

enum OrganizationType {
    family = 'family',
}

enum TransactionType {
    earn = 'earn',
    spend = 'spend',
}

enum Role {
    admin = 'admin',
    player = 'player',
}

enum UserActivityTypeEnum {
    create = 'create',
    update = 'update',
    delete = 'delete',
    comment = 'comment',
}

enum LoginType {
    username = 'username',
    email = 'email',
    phone = 'phone',
}

enum LevelType {
    numbers = 'Numbers',
    valueBlocks = 'ValueBlocks',
}

enum GropupType {
    Human = 1,
    Creatures,
    Machines,
    Seasonal,
    Others,
    RustToDiamond,
    Owned,
}

interface BasePaginationFilterOptions {
    page: number;
    pageSize: number;
}

interface IBaseEntity {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
    deletedAt?: Date;
}

interface IFile extends IBaseEntity {
    url: string;
    bucket: string;
    name: string;
    size: number;
}

interface IUser extends IBaseEntity {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    loginType: LoginType;
    lastLogin: Date;
}

class Paging<T> {
    rows?: T[] = [];
    total?: number = 0;
    page?: number = 1;
    pageSize?: number = DEFAULT_PAGE_SIZE;
    totalPages?: number = 0;
}

const DEFAULT_PAGE_SIZE = 10;

interface IAvatarItem extends IBaseEntity {
    // avatar: IAvatar;
    itemType: ItemType;
    imageURL: string;
    price: number;
    name: string;
    bought: boolean;
}

interface IAvatar extends IBaseEntity {
    name: string;
    avatarType: AvatarType;
    imageURL: string;
    avatarItems: IAvatarItem[];
    price: number;
    bought: boolean;
}

interface IOrganization extends IBaseEntity {
    name: string;
    type: OrganizationType;
}

interface IUserAvatarItem extends IBaseEntity {
    player: IOrganizationUser;
    avatarItem: IAvatarItem;
    isActive: boolean;
    collectedAt: Date;
}

interface IOrganizationUser extends IBaseEntity {
    organization: IOrganization;
    user: IUser;
    joinedAt: Date;
    role: Role;
    firstName: string;
    lastName: string;
    pin: string;
    userAvatarItems: IUserAvatarItem[];

    // These fields are only for internal use and not mapped to the database
    coin: number;
}

interface IUserLevel extends IBaseEntity {
    player?: IOrganizationUser;
    level?: ILevel;
    playerId: number;
    levelId: number;
    archivedStars?: number;
}

interface ILevel extends IBaseEntity {
    stageId: number;
    stage?: IStage;
    settings?: LevelSettings;
    infoTitle?: string;
    infoImage?: string;
    infoDescription?: string;
    infoVideoURL?: string;
    name?: string;
    instruction?: string;
    description?: string;
    type?: LevelType;

    oneStarsRatingCount?: number;
    twoStarsRatingCount?: number;
    threeStarsRatingCount?: number;
    questionCount?: number;
    order?: number;

    user_levels?: IUserLevel[];
}

interface LevelSettings {
    value_1: string;
    value_2: string;
    value_3?: string;
    value_4?: string;
    answer: string;
    operation: 'addition' | 'subtraction' | 'mixed' | 'tap' | 'more';
    answer_required: 'answer' | 'value_1' | 'value_2';
    answer_position?: 'right' | 'left';
    show_tens?: boolean;
    value_display_order?: 'normal' | 'mixed' | 'reversed';
    show_answer_bar?: boolean;
    show_value_1_only?: boolean;
    is_new_level?: boolean;
    show_sum?: boolean;
}

interface IStage extends IBaseEntity {
    avatarId: number;
    avatar: IAvatar;
    name: string;
    levels: ILevel[];
    order?: number;
}

interface ICoinTransaction extends IBaseEntity {
    player: IOrganizationUser;
    transactionType: TransactionType;
    amount: number;
    description?: string;
    transactionDate: Date;
}

interface LoginDto {
    username: string;
    otp: string;
}

interface IUserController {
    sendOTP(data: { username: string }): Promise<void>;
    login(data: LoginDto): Promise<{ token: string }>;
    logout(): Promise<void>;
    me(): Promise<IUser>;
}

interface BulkStoreAvatarDto {
    ids: number[];
    isInitial: boolean;
}

interface IAvatarController {
    getAvatars(playerId: number): Promise<IAvatar[]>;
    bulkStoreAvatar(playerId: number, props: BulkStoreAvatarDto): Promise<Boolean>;
}

interface StageRequestDto {
    stageId: number;
    playerId: number;
}

interface ListStageResponse {
    id: number;
    name: string;
    isUnlocked: boolean;
    userStar: number;
    userLevel: number;
    totalStar: number;
    totalLevel: number;
    avatar: string;
    order: number;
}

interface IStageController {
    listStageByOrganizationUserId(organizationUserId: number): Promise<ListStageResponse[]>;
    getStageById(body: StageRequestDto): Promise<IStage>;
}

interface IOrganizationUserController {
    getPlayesByUser(organizationId: number): Promise<IOrganizationUser[]>;
}

export {
    AvatarType,
    type BasePaginationFilterOptions,
    type BulkStoreAvatarDto,
    DEFAULT_PAGE_SIZE,
    EntityEnum,
    GropupType,
    type IAvatar,
    type IAvatarController,
    type IAvatarItem,
    type IBaseEntity,
    type ICoinTransaction,
    type IFile,
    type ILevel,
    type IOrganization,
    type IOrganizationUser,
    type IOrganizationUserController,
    type IStage,
    type IStageController,
    type IUser,
    type IUserAvatarItem,
    type IUserController,
    type IUserLevel,
    ItemType,
    type LevelSettings,
    LevelType,
    type ListStageResponse,
    type LoginDto,
    LoginType,
    OrganizationType,
    Paging,
    Role,
    type StageRequestDto,
    TransactionType,
    UserActivityTypeEnum,
};
