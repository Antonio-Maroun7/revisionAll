-- FUNCTION: public.dep_emp()

-- DROP FUNCTION IF EXISTS public.dep_emp();

CREATE OR REPLACE FUNCTION public.dep_emp(
	)
    RETURNS TABLE(id integer, name text, v json) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
RETURN QUERY
SELECT departments.dep_id,
departments.dep_name,
COALESCE(
json_agg(
json_build_object(
'client_id', clients.client_id,
'client_name', clients.client_name
)
) FILTER (WHERE client_id IS not null), '[]'
) as employees
FROM departments
LEFT JOIN clients ON clients.dep_id = departments.dep_id
group by departments.dep_id;
END;
$BODY$;

ALTER FUNCTION public.dep_emp()
    OWNER TO postgres;
