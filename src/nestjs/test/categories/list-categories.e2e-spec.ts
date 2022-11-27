import request from 'supertest';
import { CategoryRepository } from '@fc/core/category/domain';
import { CATEGORY_PROVIDERS } from '../../src/categories/category.providers';
import { ListCategoriesFixture } from '../../src/categories/fixtures';
import { CategoriesController } from '../../src/categories/categories.controller';
import { instanceToPlain } from 'class-transformer';
import { startApp } from '../../src/@share/testing/helpers';

describe('CategoriesController (e2e)', () => {
    describe('/categories (GET)', () => {
        describe('should return categories sorted by created_at when request query is empty', () => {
            let categoryRepo: CategoryRepository.Repository;
            const nestApp = startApp();
            const { entitiesMap, arrange } =
                ListCategoriesFixture.arrangeIncrementedWithCreatedAt();

            beforeEach(async () => {
                categoryRepo = nestApp.app.get<CategoryRepository.Repository>(
                    CATEGORY_PROVIDERS.REPOSITORY.CATEGORY_REPOSITORY.provide,
                );
                await categoryRepo.bulkInsert(Object.values(entitiesMap));
            });

            test.each(arrange)(
                'when query params is $send_data',
                async ({ send_data, expected }) => {
                    const queryParams = new URLSearchParams(send_data as any).toString();
                    return request(nestApp.app.getHttpServer())
                        .get(`/categories/?${queryParams}`)
                        .expect(200)
                        .expect({
                            data: expected.entities.map((e) =>
                                instanceToPlain(CategoriesController.categoryToResponse(e)),
                            ),
                            meta: expected.meta,
                        });
                },
            );
        });

        describe('should return categories using paginate, filter and sort', () => {
            let categoryRepo: CategoryRepository.Repository;
            const nestApp = startApp();
            const { entitiesMap, arrange } = ListCategoriesFixture.arrangeUnsorted();

            beforeEach(async () => {
                categoryRepo = nestApp.app.get<CategoryRepository.Repository>(
                    CATEGORY_PROVIDERS.REPOSITORY.CATEGORY_REPOSITORY.provide,
                );
                await categoryRepo.bulkInsert(Object.values(entitiesMap));
            });

            test.each([arrange[0]])(
                'when query params is $send_data',
                async ({ send_data, expected }) => {
                    const queryParams = new URLSearchParams(send_data as any).toString();
                    return request(nestApp.app.getHttpServer())
                        .get(`/categories/?${queryParams}`)
                        .expect(200)
                        .expect({
                            data: expected.entities.map((e) =>
                                instanceToPlain(CategoriesController.categoryToResponse(e)),
                            ),
                            meta: expected.meta,
                        })
                },
            );
        });
    });
});


const aaa = {
    data: [
        {
            id: 'b995698a-1e96-45f9-9236-54f247cdbf59',
            name: 'AAA',
            description: 'Miw mug ejohubzat duzato bu ho ra ajeza osusob ed rigumil igacecuvi. Suvi na zakubhic huzag runacol kol fokoz leeppo avsa hu esoj az sunabaru nakec. Pulam ceba pujvo usehu luz huzonti poupe jiiwenaz duwete be fid ubewaf gulingij metiv. Jo ononaupo obafa ugpehan anu jedgoaju tu ene pat biwco vefopsif bomov gaavuum zo dubapum sijiow. Cujsido ho hakujkon edikoj jidolis bozjugcuw ciral rugzo bo ojavok asuohifaz amonfo ju kowihkus pektiwje. Oluja ulwe tiz rufob mav he fehmutbiw daghij jakizuga var emecodi ziplu wakim jig le niula ocugu.',
            is_active: true,
            created_at: '2022-11-26T21:10:44.610Z'
        },
        {
            id: '58cd0c3a-3227-4cea-a266-51af3a2f07cd',
            name: 'AaA',
            description: 'Ocsifur pesgij husurriw kodizbod uvefapad ka aji defamci cobe se emi tupihpu kivonfo lacalaf nela pajemgu fivazona. Ep kumhunu ce tonaco timwav lelapja fumviaw hac kazup coz detto puk zolitug hepkoju. Folecu popvan sakih kak kurmalfas ike nualnil noj muvi aba fi kegba sibinvif locmil uwi. Vuihe usce eg gofu ke wutigofes ze wos fi vile itecivi ok vew afanuw akagusce. Cethiwe gegemiz mahem kekir tap wowdeeli raehwa popu nucimeeg ho siw vov hukocmo cuwpe icu poj.',
            is_active: true,
            created_at: '2022-11-26T21:10:44.611Z'
        }
    ],
    meta: { total: 3, current_page: 1, last_page: 2, per_page: 2 }
}


const value = [
    {
        id: '2634936a-6f93-4235-b9ce-e896030732f1',
        name: 'a',
        description: 'Miw pitaj ehibi cofum vin sekaz vo af jenpefdeg gef ib uwitaz cojawmac jankip pud zijazav mo dok. Ti bekicjad iwi pim zommebo dovuj se ha tigluwofi vuhka kogehvoj co duk kih etenar vo ul lavzumum. Iw voes ehu divmir ahsazoso tac tasif pu efwola tum fouzi ikubabde ijabi.',
        is_active: true,
        created_at: '2022-11-26T21:12:49.000Z'
    },
    {
        id: '36f151fd-d663-4218-8582-c995dee62d85',
        name: 'AaA',
        description: 'Nomnejic rilezkeg kari seorwo jujmovne jenwut sopsug ge mugeh refofiger pucav vonki ke. Celcoapa sakecce turtosep wusufe vakna beji eleka wegoir eg god ezakef dowifi nitda us wiuzzoh suw. Nikkiv saznup ig ekbam mavsirip wokucsa ceb hairu tibno jad sivcahuk du kod zakip. Duvduk waaza onzi dobpouvi tiabowel tais te zordid tezies ta pilfahuw wohcoh atpijme ba lonafog pif.',
        is_active: true,
        created_at: '2022-11-26T21:12:49.000Z'
    }
]