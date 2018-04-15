
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
      table.integer   ('grade_level').notNullable();
      table.string    ('mission').notNullable();
      table.string    ('mission_favorite').notNullable();
      table.string    ('easiest').notNullable();
      table.string    ('most_difficult').notNullable();
      table.string    ('improve_suggestion').notNullable();
      table.integer   ('communicate_score').notNullable();
      table.integer   ('communicate_score_others').notNullable();
      table.integer   ('trust_others').notNullable();
      table.string    ('trust_examples').notNullable();
      table.string    ('problem_solve_skills').notNullable();
      table.string    ('create_solution').notNullable();
      table.string    ('personality_traits').notNullable();
      table.integer   ('teamwork_comp_rate').notNullable();
      table.string    ('job_first_choice').notNullable();
      table.boolean   ('job_first_choice_get').notNullable();

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
