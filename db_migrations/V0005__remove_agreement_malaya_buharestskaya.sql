-- Удаление договора управления для дома на Малой Бухарестской
UPDATE t_p71212982_home_management_site.houses 
SET management_agreement = NULL 
WHERE id = 'spb-malaya-buharestskaya-12str1';