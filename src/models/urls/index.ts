const main_url = 'https://questimie.herokuapp.com/api/';
const red_url = 'https://www.questimie.herokuapp.com/api/';

export const  url = {
    //------------------------------------//
    login: (): string => `${main_url}dude`,
    //------------------------------------//
    logout: (id: string): string => `${main_url}dude/${id}`,
    //------------------------------------//
    test_list: (): string => main_url,
    //------------------------------------//
    private_test: (id: string): string => (`${main_url}${id}`),
    //------------------------------------//
    test: (id: string): string => `${main_url}${id}`,
    //------------------------------------//
    answers: (id: string): string => `${main_url}${id}/answer/`,
    //------------------------------------//
    results: (user_id: string): string => `${main_url}dude/${user_id}`,
}
