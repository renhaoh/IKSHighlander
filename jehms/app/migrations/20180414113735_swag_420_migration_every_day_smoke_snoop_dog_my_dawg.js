
exports.up = function(knex, Promise) {
    return Promise.all([

    knex.schema.createTable('pre_responses', function(table) {
      // identification columns
      table.increments('id').notNullable().primary();
      table.dateTime  ('time' ).notNullable();
      table.integer   ('student_id').notNullable();
      table.integer   ('grade_level').notNullable();
      table.string    ('mission').notNullable();
      table.integer   ('pre_mission_score').notNullable();
      table.string    ('pre_job_role').notNullable();
      table.string    ('pre_job_why').notNullable();
      table.string    ('pre_job_skills').notNullable();
      table.string    ('pre_personality').notNullable();
      table.string    ('pre_excited').notNullable();
      table.boolean   ('pre_mission_jitters').notNullable();
    }),

    knex.schema.createTable('post_responses', function(table) {
    	// identification columns
      table.increments('id').notNullable().primary();
      table.integer   ('student_id').notNullable();
      table.dateTime  ('time' ).notNullable();
      table.integer   ('grade_level');
      table.string    ('mission');
      table.string    ('mission_favorite');
      table.string    ('easiest');
      table.string    ('most_difficult');
      table.string    ('improve_suggestion');
      table.integer   ('communicate_score');
      table.integer   ('communicate_score_others');
      table.integer   ('trust_others');
      table.string    ('trust_examples');
      table.string    ('problem_solve_skills');
      table.string    ('create_solution');
      table.string    ('personality_traits');
      table.integer   ('teamwork_comp_rate');
      table.string    ('job_first_choice');
      table.boolean   ('job_first_choice_get');

      // Either
      table.boolean   ('job_first_choice_learn');
      table.string    ('job_first_choice_learn_why');
      table.string    ('job_first_choice_other_roles');
      table.string    ('job_first_choice_skills');
      table.boolean   ('job_first_choice_pressure');
      table.string    ('job_first_choice_pressure_why');
      table.boolean   ('job_first_choice_critical');
      table.string    ('job_first_choice_critical_why');

      // Or
      table.boolean   ('job_second_choice_affect');
      table.string    ('job_second_choice_affect_why');
      table.string    ('job_second_choice_other_roles');
      table.string    ('job_second_choice_skills');
      table.boolean   ('job_second_choice_pressure');
      table.string    ('job_second_choice_pressure_why');
      table.boolean   ('job_second_choice_critical');
      table.string    ('job_second_choice_critical_why');

      // Back
      table.string    ('examples_tie_class');
      table.string    ('something_new');

    })

  ]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
    knex.schema.dropTable('pre_responses'),
    knex.schema.dropTable('post_responses')
  ]);
};
