
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
      table.string    ('pre_job_why', 1000).notNullable();
      table.string    ('pre_job_skills', 1000).notNullable();
      table.string    ('pre_personality', 1000).notNullable();
      table.string    ('pre_excited', 1000).notNullable();
      table.boolean   ('pre_mission_jitters').notNullable();
    }),

    knex.schema.createTable('post_responses', function(table) {
    	// identification columns
      table.increments('id').notNullable().primary();
      table.dateTime  ('time' ).notNullable();
      table.integer   ('student_id').notNullable();
      table.integer   ('grade_level');
      table.string    ('mission');
      table.string    ('mission_favorite', 1000);
      table.string    ('easiest', 1000);
      table.string    ('most_difficult', 1000);
      table.string    ('improve_suggestion', 1000);
      table.integer   ('communicate_score');
      table.integer   ('communicate_score_others');
      table.integer   ('trust_others');
      table.string    ('trust_examples', 1000);
      table.string    ('problem_solve_skills', 1000);
      table.string    ('create_solution', 1000);
      table.string    ('personality_traits', 1000);
      table.integer   ('teamwork_comp_rate'); //???
      table.string    ('job_first_choice', 1000);
      table.boolean   ('job_first_choice_get');
      
      

      // Either
      table.boolean   ('job_first_choice_learn');
      table.string    ('job_first_choice_learn_why', 1000);
      table.string    ('job_first_choice_other_roles', 1000);
      table.string    ('job_first_choice_skills', 1000);
      table.boolean   ('job_first_choice_pressure');
      table.string    ('job_first_choice_pressure_why', 1000);
      table.boolean   ('job_first_choice_critical');
      table.string    ('job_first_choice_critical_why', 1000);

      // Or
      table.boolean   ('job_second_choice_affect');
      table.string    ('job_second_choice_affect_why', 1000);
      table.string    ('job_second_choice_other_roles', 1000);
      table.string    ('job_second_choice_skills', 1000);
      table.boolean   ('job_second_choice_pressure');
      table.string    ('job_second_choice_pressure_why', 1000);
      table.boolean   ('job_second_choice_critical');
      table.string    ('job_second_choice_critical_why', 1000);

      // Back
      table.string    ('examples_tie_class', 1000);
      table.string    ('something_new', 1000);

    })

  ]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
    knex.schema.dropTable('pre_responses'),
    knex.schema.dropTable('post_responses')
  ]);
};
