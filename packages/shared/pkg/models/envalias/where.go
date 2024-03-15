// Code generated by ent, DO NOT EDIT.

package envalias

import (
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/e2b-dev/infra/packages/shared/pkg/models/internal"
	"github.com/e2b-dev/infra/packages/shared/pkg/models/predicate"
)

// ID filters vertices based on their ID field.
func ID(id string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldLTE(FieldID, id))
}

// IDEqualFold applies the EqualFold predicate on the ID field.
func IDEqualFold(id string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldEqualFold(FieldID, id))
}

// IDContainsFold applies the ContainsFold predicate on the ID field.
func IDContainsFold(id string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldContainsFold(FieldID, id))
}

// EnvID applies equality check predicate on the "env_id" field. It's identical to EnvIDEQ.
func EnvID(v string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldEQ(FieldEnvID, v))
}

// IsRenameable applies equality check predicate on the "is_renameable" field. It's identical to IsRenameableEQ.
func IsRenameable(v bool) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldEQ(FieldIsRenameable, v))
}

// EnvIDEQ applies the EQ predicate on the "env_id" field.
func EnvIDEQ(v string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldEQ(FieldEnvID, v))
}

// EnvIDNEQ applies the NEQ predicate on the "env_id" field.
func EnvIDNEQ(v string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldNEQ(FieldEnvID, v))
}

// EnvIDIn applies the In predicate on the "env_id" field.
func EnvIDIn(vs ...string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldIn(FieldEnvID, vs...))
}

// EnvIDNotIn applies the NotIn predicate on the "env_id" field.
func EnvIDNotIn(vs ...string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldNotIn(FieldEnvID, vs...))
}

// EnvIDGT applies the GT predicate on the "env_id" field.
func EnvIDGT(v string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldGT(FieldEnvID, v))
}

// EnvIDGTE applies the GTE predicate on the "env_id" field.
func EnvIDGTE(v string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldGTE(FieldEnvID, v))
}

// EnvIDLT applies the LT predicate on the "env_id" field.
func EnvIDLT(v string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldLT(FieldEnvID, v))
}

// EnvIDLTE applies the LTE predicate on the "env_id" field.
func EnvIDLTE(v string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldLTE(FieldEnvID, v))
}

// EnvIDContains applies the Contains predicate on the "env_id" field.
func EnvIDContains(v string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldContains(FieldEnvID, v))
}

// EnvIDHasPrefix applies the HasPrefix predicate on the "env_id" field.
func EnvIDHasPrefix(v string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldHasPrefix(FieldEnvID, v))
}

// EnvIDHasSuffix applies the HasSuffix predicate on the "env_id" field.
func EnvIDHasSuffix(v string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldHasSuffix(FieldEnvID, v))
}

// EnvIDEqualFold applies the EqualFold predicate on the "env_id" field.
func EnvIDEqualFold(v string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldEqualFold(FieldEnvID, v))
}

// EnvIDContainsFold applies the ContainsFold predicate on the "env_id" field.
func EnvIDContainsFold(v string) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldContainsFold(FieldEnvID, v))
}

// IsRenameableEQ applies the EQ predicate on the "is_renameable" field.
func IsRenameableEQ(v bool) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldEQ(FieldIsRenameable, v))
}

// IsRenameableNEQ applies the NEQ predicate on the "is_renameable" field.
func IsRenameableNEQ(v bool) predicate.EnvAlias {
	return predicate.EnvAlias(sql.FieldNEQ(FieldIsRenameable, v))
}

// HasEnv applies the HasEdge predicate on the "env" edge.
func HasEnv() predicate.EnvAlias {
	return predicate.EnvAlias(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, EnvTable, EnvColumn),
		)
		schemaConfig := internal.SchemaConfigFromContext(s.Context())
		step.To.Schema = schemaConfig.Env
		step.Edge.Schema = schemaConfig.EnvAlias
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasEnvWith applies the HasEdge predicate on the "env" edge with a given conditions (other predicates).
func HasEnvWith(preds ...predicate.Env) predicate.EnvAlias {
	return predicate.EnvAlias(func(s *sql.Selector) {
		step := newEnvStep()
		schemaConfig := internal.SchemaConfigFromContext(s.Context())
		step.To.Schema = schemaConfig.Env
		step.Edge.Schema = schemaConfig.EnvAlias
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.EnvAlias) predicate.EnvAlias {
	return predicate.EnvAlias(sql.AndPredicates(predicates...))
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.EnvAlias) predicate.EnvAlias {
	return predicate.EnvAlias(sql.OrPredicates(predicates...))
}

// Not applies the not operator on the given predicate.
func Not(p predicate.EnvAlias) predicate.EnvAlias {
	return predicate.EnvAlias(sql.NotPredicates(p))
}
